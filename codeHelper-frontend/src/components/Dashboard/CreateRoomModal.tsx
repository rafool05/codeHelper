import { backend_url } from '../../utils/getBackendUrl';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from "../../ui/BaseModal.tsx";
import Input from "../Input.tsx"
import { ToastError, ToastSuccess } from "../../utils/toast.ts";
import { Button } from '../../ui/Button';
type Props = {
  isOpen: boolean;
  setOpen: (x:boolean) => void;
};

export default function CreateRoomModal(Props : Props) {
    const [roomName, setRoomName] = useState("");
    const {isOpen,setOpen}= Props;
    const navigate = useNavigate();
    const handleSubmit = async() => {
        if (roomName.trim()) {
            try{
                const response = await fetch(`${backend_url}/addRoom`,{
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

                if(result.errors){
                    result.errors.forEach((e : {message : string},index : number)=>{
                        setTimeout(()=>{
                            ToastError(e.message)

                        },index*1000)
                    })
                }
                else{
                    ToastSuccess("Room Created Successfully")
                    navigate('/editor/' + result.hash)
                }
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
        <Button
            onClick={handleSubmit}
            variant="pos-cta"
            size="md"
            className="mt-5 w-full text-md"
        >
            Create
        </Button>
    </Modal>
    );
}
