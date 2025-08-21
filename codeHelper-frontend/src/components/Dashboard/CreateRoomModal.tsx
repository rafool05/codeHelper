import { useState } from "react";
import Modal from "../BaseModal.tsx";
import Input from "../Input.tsx"
type Props = {
  isOpen: boolean;
  setOpen: (x:boolean) => void;
};

export default function CreateRoomModal(Props : Props) {
    const [roomName, setRoomName] = useState("");
    const {isOpen,setOpen}= Props;
    const handleSubmit = async() => {
        if (roomName.trim()) {
            try{
                const response = await fetch("http://localhost:8080/addRoom",{
                    method : "POST",
                    headers : {
                        "Content-type" : "application/json"
                    },
                    credentials : "include",
                    body : JSON.stringify({
                        title : roomName
                    })
                })
                const result = await response.json()
                window.location.href='/editor/'+result.hash
                setOpen(false);
            }
            catch(e){}
        }
    };

    return (
    <Modal isOpen={isOpen} onClose={()=>{setOpen(false)}} title="Create Room">
        <Input
            type="text"
            placeholder="Enter room name"
            value={roomName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomName(e.target.value)}
            className = "w-full"
        />
        <button
        onClick={handleSubmit}
        className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold py-2 rounded mt-5 transition"
        >   
            Create
        </button>
    </Modal>
    );
}
