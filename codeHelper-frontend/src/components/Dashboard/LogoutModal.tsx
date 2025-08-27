import Modal from "../../ui/BaseModal.tsx"
import { Button } from "../../ui/Button"
export function LogoutModal({isOpen , onClose, onAction } : {isOpen : boolean, onClose : ()=>void, onAction : ()=>void}){
    return <Modal isOpen={isOpen} onClose={onClose} title="Are you sure you want to logout?">
      <div className="flex gap-6 justify-center mt-4">
        <Button variant="neg-cta" size="md" className=" w-36"onClick={()=>{onAction()}}>Yes, Logout</Button>
        <Button variant="primary" size="md" className=" w-36"onClick={() => {onClose()}}>Cancel</Button>
      </div>
    </Modal>
}