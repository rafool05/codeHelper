import { toast } from "react-toastify";
import { CopyIcon } from "../../Icons/CopyIcon";
import Modal from "../../ui/BaseModal.tsx";
import { ToastSuccess } from "../../utils/toast";

export function ShareModal(props : {room_id : string, isOpen : boolean, onClose : ()=>void}){
    
    return <Modal isOpen = {props.isOpen} onClose={props.onClose} title="Share Room ID" >
        <div className="flex justify-between hover:bg-primary-900 p-4 rounded-md text-primary-600 hover:text-secondary-800 transition">
            <div className="">Copy ID To Clipboard</div>
            <button className = 'cursor-pointer text-primary-600 hover:text-secondary-800 transition'onClick={()=>{
                navigator.clipboard.writeText(props.room_id)
                ToastSuccess('Successfully Copied')
            }}><CopyIcon/></button>
        </div>
    </Modal>
}