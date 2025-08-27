import { backend_url } from '../../utils/getBackendUrl';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from "../../ui/BaseModal";
import Input from "../Input";
import { ToastError, ToastSuccess } from '../../utils/toast';
import { Button } from '../../ui/Button';

type Props = {
  isOpen: boolean,
  setOpen : (x:boolean)=>void
};

export default function JoinRoomModal({ isOpen, setOpen }: Props) {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (roomId.trim()) {
  const response = await fetch(`${backend_url}/joinRoom`,{
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
                ToastError(err.message);
            }, index * 1000);
          });
        }
      }
      else{
        ToastSuccess("Room Joined Successfully")
        navigate('/editor/'+roomId)
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
        <Button
          onClick={handleSubmit}
          variant="pos-cta"
          size="md"
          className="mt-5 w-full text-md"
        >
          Join
        </Button>
    </Modal>
  );
}
