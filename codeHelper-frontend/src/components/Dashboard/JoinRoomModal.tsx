import { useState } from "react";
import Modal from "../BaseModal";
import Input from "../Input";
import { toast } from "react-toastify";

type Props = {
  isOpen: boolean,
  setOpen : (x:boolean)=>void
};

export default function JoinRoomModal({ isOpen, setOpen }: Props) {
  const [roomId, setRoomId] = useState("");

  const handleSubmit = async () => {
    if (roomId.trim()) {
      const response = await fetch("http://localhost:8080/joinRoom",{
        method : "PUT",
        credentials : 'include',
        headers : {
          'Content-type' : 'application/json'
        },
        body : JSON.stringify({
          hash : roomId.trim()
        })
      })
      if(!response.ok){
        const data = await response.json();
        if (data.errors && Array.isArray(data.errors)) {
          data.errors.forEach((err: { message: string }, index: number) => {
            setTimeout(() => {
              toast.error(err.message, {
                position: 'top-right',
                autoClose: 2000,
                theme: "dark"
              });
            }, index * 1000);
          });
        }
      }
      else{
        window.location.href='/editor/'+roomId
      }
      setRoomId('');
      setOpen(false)
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={()=>setOpen(false)} title="Join Room">
      <Input
        type="text"
        placeholder="Enter room ID"
        value={roomId}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomId(e.target.value)}
        className="w-full px-4 py-2 rounded bg-primary-700 text-gray-100 focus:outline-none focus:ring focus:ring-yellow-400 mb-4"
      />
      <button
        onClick={handleSubmit}
        className="mt-5 w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold py-2 rounded transition"
      >
        Join
      </button>
    </Modal>
  );
}
