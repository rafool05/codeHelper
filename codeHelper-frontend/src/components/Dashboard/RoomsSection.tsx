import { backend_url } from '../../utils/getBackendUrl';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DeleteIcon from "../../Icons/DeleteIcon";
import ExitIcon from "../../Icons/ExitIcon";
import { ToastError, ToastSuccess } from '../../utils/toast';
import { ShareIcon } from '../../Icons/ShareIcon';

// Dummy data type
type Room = {
  _id: string;
  title: string;
  joinedUsers: [any],
  date : Date
  hash : string
};
type Props = { section: 'my' | 'joined' };

async function getRooms(){
  const data = await fetch(`${backend_url}/getRooms`,{
        method : "GET",
        headers : {
            "Content-type" : "application/json",
        },
        credentials:"include"
    })
    return await data.json()
    
}
export default function RoomsSection({ section }: Props) {
  const navigate = useNavigate();
  async function handleDelete(key:string){
  const response = await fetch(`${backend_url}/deleteRoom?`+new URLSearchParams({r_id : key}).toString(),{
      method : "DELETE",
      credentials:'include',
      headers:{
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        room_id : key
      })
    })  
    const result = await response.json();
    if(result.errors){
      result.errors.forEach((e: { message: string }, index: number) => {
        setTimeout(() => {
        ToastError(e.message);
        }, index * 1000); 
      });
    }
    else{
      ToastSuccess("Room Deleted Successfully");
    }
    setRooms(prev => ({
    ...prev,
      my: prev.my.filter(room => room._id !==key)
    }));
  }
  async function handleLeaveRoom(hash:string){
  const response = await fetch(`${backend_url}/leaveRoom`,{
      method : "PUT",
      credentials:'include',
      headers:{
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({ hash })
    })
    const result = await response.json();
    if(result.errors){
      result.errors.forEach((e: { message: string }, index: number) => {
        setTimeout(() => {
        ToastError(e.message);
        }, index * 1000); 
      });
    }
    else{
      ToastSuccess("Left Room Successfully");
      setRooms(prev => ({
        ...prev,
        joined: prev.joined.filter(room => room.hash !== hash)
      }));
    }
  }
  const [rooms,setRooms] = useState<{my:Room[],joined:Room[]}>({my : [], joined:[]})

  useEffect(()=>{
    
    getRooms().then(result=>{
      setRooms({
        my : result.rooms,
        joined : result.joinedRooms
      })
    });
  },[])
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {rooms[section].map((room) => (
        <div onClick = {()=>navigate('/editor/'+room.hash)}>
          <RoomCard 
            key={room._id} 
            room={room} 
            section={section} 
            onDelete={()=>handleDelete(room._id)}
            onLeave={()=>handleLeaveRoom(room.hash)}
          />
        </div>
      ))}
    </div>
  );
}

function RoomCard({ room, section, key, onDelete, onLeave }: { room: Room; section: 'my' | 'joined', key:string, onDelete : (x:string)=>void, onLeave?: ()=>void }) {
  return (
    <div className="bg-primary-800 rounded-lg shadow p-6 flex flex-col gap-4 hover:shadow-lg cursor-pointer hover:bg-primary-950 hover:scale-105 transition">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-yellow-400">{room.title}</h2>
        <span className="text-sm text-gray-400">{new Date(room.date).toLocaleDateString()}</span>
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-gray-200 font-semibold">{room.joinedUsers.length} Member(s)</span>
      </div>
      <div className="mt-4 flex gap-4 justify-end" onClick={(e)=>{
        e.stopPropagation();
        navigator.clipboard.writeText(room.hash)
        ToastSuccess("Successfully Copied")
      }}>
        <button className='text-primary-600 hover:text-secondary-800 cursor-pointer transition'>
          <ShareIcon/>
        </button>
        {section === 'my' ? (
          <button className="text-red-500 cursor-pointer hover:text-red-700 transition" onClick={(e)=>{
            e.stopPropagation();
            onDelete(key)
          }}>
            <DeleteIcon/>
          </button>
        ) : (
          <button className="text-secondary-800 cursor-pointer hover:text-secondary-900 transition" onClick={(e)=>{
            e.stopPropagation();
            if(onLeave) onLeave();
          }}>
            <ExitIcon/>
          </button>
        )}
      </div>
    </div>
  );
}
