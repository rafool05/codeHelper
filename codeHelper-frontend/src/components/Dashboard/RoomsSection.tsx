import { useEffect, useState } from "react";
import DeleteIcon from "../../Icons/DeleteIcon";
import ExitIcon from "../../Icons/ExitIcon";
import { toast } from "react-toastify";

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
    const data = await fetch("http://localhost:8080/getRooms",{
        method : "GET",
        headers : {
            "Content-type" : "application/json",
        },
        credentials:"include"
    })
    return await data.json()
    
}
export default function RoomsSection({ section }: Props) {
  async function handleDelete(key:string){
    const response = await fetch('http://localhost:8080/deleteRoom?'+new URLSearchParams({r_id : key}).toString(),{
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
          toast.error(e.message, {
            position: 'top-right',
            autoClose: 2000,
            theme:"dark",
            pauseOnHover:false
          });
        }, index * 1000); 
      });
    }
    else{
      toast.success("Room Deleted Successfully",{
        autoClose:2000,
        theme : "dark",
        pauseOnHover:false
      })
    }
    setRooms(prev => ({
    ...prev,
      my: prev.my.filter(room => room._id !==key)
    }));
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
  console.log(rooms)
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {rooms[section].map((room) => (
        <div onClick = {()=>window.location.href = ('editor/'+room.hash)}>
          <RoomCard key={room._id} room={room} section={section} onDelete={()=>handleDelete(room._id)}/>
        </div>
      ))}
    </div>
  );
}

function RoomCard({ room, section,key,onDelete }: { room: Room; section: 'my' | 'joined',key:string,onDelete : (x:string)=>void}) {
  return (
    <div className="bg-primary-800 rounded-lg shadow p-6 flex flex-col gap-4 hover:shadow-lg cursor-pointer hover:bg-primary-950 hover:scale-105 transition">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-yellow-400">{room.title}</h2>
        <span className="text-sm text-gray-400">{new Date(room.date).toLocaleDateString()}</span>
      </div>
      <div className="flex gap-2 items-center">
        {/* <MembersIcon className="h-5 w-5 text-secondary-800" /> */}
        <span className="text-gray-200 font-semibold">{room.joinedUsers.length} Member(s)</span>
      </div>
      <div className="mt-4 flex justify-end">
        {section === 'my' ? (
          <button className="text-red-500 cursor-pointer hover:text-red-700 transition" onClick={(e)=>{
            e.stopPropagation();
            onDelete(key)
          }}>
            <DeleteIcon/>
          </button>
        ) : (
          <button className="text-secondary-800 cursor-pointer hover:text-secondary-900 transition">
            <ExitIcon/>
          </button>
        )}
      </div>
    </div>
  );
} 
