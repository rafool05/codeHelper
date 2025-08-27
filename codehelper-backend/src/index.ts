import cors from "cors";
import express,{Request,Response} from 'express'
import { Room, User } from "./db/db";
import bcrypt from 'bcrypt'
import { validateInput } from "./middleware/validateInput.middleware";
import { auth } from "./middleware/auth.middleware";
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
const DB_URL = process.env.DB_URL as string
mongoose.connect(DB_URL)
const JWT_SECRET : string = process.env.JWT_SECRET as string
const app = express();
app.use(express.json())
app.use(cookieParser()) 
app.use(cors({origin:"http://localhost:3000",credentials:true}))  

app.post("/signup",validateInput, async (req : Request,res:Response)=>{
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  try{
    await User.create({
      username,
      email,
      password : await bcrypt.hash(password,5)
    })
    res.json({
      messages : [{message : "Successfully Created User"}]
    })
  }
  catch(e){
    res.status(403).json({
      errors : [{message:"User Already Exists"}]
    })
  }
})
app.post("/signin",async(req : Request,res:Response)=>{
  const userInfo = req.body.userInfo;
  const password = req.body.password
  const user = await User.findOne({
    $or:[{username : userInfo},{email:userInfo}]
  })
  if(!user){
    res.status(404).json({
      errors : [{message : "User Not Found"}]
    })
  }
  else{
    // console.log(user.password)
    // console.log(password)
    const result = await bcrypt.compare(password,user.password)
    // console.log(result)
    if(result){
        const token = jwt.sign({username : user.username,email : user.email,_id : user._id},JWT_SECRET);
        res.cookie('token',token,{
          httpOnly:true,  
          sameSite:"strict",
          maxAge: 4*60*60*1000
        })
        res.json({
          messages : [{message : "Successfully Logged in"}]
        })
    } 
    else{
      res.status(401).json({
        errors : [{message:"Incorrect Password"}]
      })
    }
    
  }
})
app.get("/getRooms",auth,async(req:Request,res:Response)=>{
  try{
    const getUser = await User.findOne({
      _id : req.body._id
    }).populate("rooms").populate('joinedRooms')
    res.json({
      rooms : getUser?.rooms,
      joinedRooms : getUser?.joinedRooms,
    })
  }
  catch(e){
    res.status(400).json({
      errors : [{message : "Unexpected Error Occured"}]
    })
  }
})
app.post("/addRoom",auth,async(req : Request,res:Response)=>{
  try{
    const newRoom = await Room.create({
        title : req.body.title,
        user : req.body._id,
        date : new Date()
    })
    await User.updateOne({
      _id : req.body._id
    },{
      $push : {rooms : newRoom._id}
    })
    res.json({
      message : "Successfully Created New Room",
      hash : newRoom.hash
    })
  }
  catch(e){
    res.status(500).json({
      errors:[{message:"Unexpected error occured"}]
    })
  }
})
app.put('/joinRoom',auth,async(req:Request,res:Response)=>{
  try {
    const { _id, hash } = req.body; // User ID and Room hash from body
    // Find the room locally
    const room = await Room.findOne({ hash });
    if (!room) {
      res.status(404).json({
        errors: [{ message: "Room Not Found" }]
      });
      return;
    }
    // Add user to room's joinedUsers if not already present
    if(room.user == _id){
      res.status(400).json({
        errors : [{message : "You are the owner"}]
      })
      return;
    }
    if (!room.joinedUsers.some((u: any) => u.toString() === _id)) {
      room.joinedUsers.push(_id);
      await room.save();
    }
    // Add room to user's joinedRooms if not already present
    const user = await User.findById(_id);
    if (!user!.joinedRooms.some((r) => r.toString() === room._id.toString())) {
      user!.joinedRooms.push(room._id);
      await user!.save();
      res.json({
        messages: [{ message: "Successfully joined room" }],
        roomHash: room.hash
      });
    }
  } catch (e) {
    res.status(500).json({
      errors: [{ message: "Unexpected error occured" }]
    });
  }
})
app.put('/leaveRoom', auth, async (req: Request, res: Response) => {
  try {
    const { _id, hash } = req.body; // User ID and Room hash from body
    const room = await Room.findOne({ hash });
    if (!room) {
      res.status(404).json({ errors: [{ message: "Room Not Found" }] });
      return;
    }
    // Remove user from room's joinedUsers
    await Room.updateOne(
      { hash },
      { $pull: { joinedUsers: _id } }
    );
    // Remove room from user's joinedRooms
    await User.updateOne(
      { _id },
      { $pull: { joinedRooms: room._id } }
    );
    res.json({ messages: [{ message: "Successfully left room" }] });
  } catch (e) {
    res.status(500).json({ errors: [{ message: "Unexpected error occured" }] });
  }
});
app.delete("/deleteRoom",auth,async(req:Request,res:Response)=>{
  try{
    const r_id = req.query.r_id;
    // Find the room to get joinedUsers
    const room = await Room.findOne({ _id: r_id, user: req.body._id });
    if (!room) {
      res.status(404).json({ errors: [{ message: "Room Not Found" }] });
      return 
    }
    // Delete the room
    await Room.deleteOne({ _id: r_id, user: req.body._id });
    // Remove from owner's rooms
    await User.updateOne(
      { _id: req.body._id },
      { $pull: { rooms: r_id } }
    );
    // Remove from joinedRooms of all joined users
    if (room.joinedUsers && room.joinedUsers.length > 0) {
      await User.updateMany(
        { _id: { $in: room.joinedUsers } },
        { $pull: { joinedRooms: room._id } }
      );
    }
    res.json({
      message: "Room Successfully Deleted"
    });
  }
  catch(err){
    res.status(500).json({
      errors : [{message : "Unexpected error Occured"}]
    })
  }
})
app.get("/getRoomData",auth,async(req:Request,res:Response)=>{
  const hash = req.query.hash;
  const _id = req.body._id;
  const room = await Room.findOne({
    hash
  })
  if(!room){  
    
    res.status(404).json({
      errors : [{message : "Room Not Found"}]
    })
  }
  else if(room.user!.toString() != _id && !room.joinedUsers.some(u=>u.toString()==_id)){
    res.status(403).json({
      errors : [{message : "Not Authenticated"}]
    })
    return;
  }
  else{
    const roomObj: any = room.toObject();
    roomObj.ydoc = Buffer.isBuffer(room.ydoc) ? (room.ydoc as Buffer).toString('base64') : room.ydoc;
    res.json({
      room: roomObj
    })}
})  
app.get("/isAuth",auth,async(_ : Request,res : Response)=>{
  res.json({
    messages : [{message : "User Is Authenticated"}]

  })
})
app.get("/getUser",auth,async(req:Request,res : Response)=>{
  res.json({
    _id : req.body._id,
    username: req.body.username,
    email : req.body.email,
  })
})  
app.post('/logout',(_:  Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'strict',
    secure: false // set to true if using https
  });
  res.json({ messages: [{ message: 'Successfully logged out' }] });
});
app.put('/saveCode', auth, async(req: Request, res: Response)=>{
  try {
    const hash = req.body.hash
    const encodingBase64 = req.body.encodingBase64 as string
    if (!hash) {
      res.status(400).json({ errors: [{ message: 'Missing encoding or hash' }] });
      return;
    }
    const room = await Room.findOne({ hash });
    if (!room) {
      res.status(404).json({ errors: [{ message: 'Room Not Found' }] });
      return ;
    }
    // 
    room.ydoc = encodingBase64
    await room.save();
    res.json({ messages: [{ message: 'Code saved successfully' }] });
  } catch (e) {
    res.status(500).json({ errors: [{ message: 'Unexpected error occured' }] });
  }
});
app.listen(8080)
