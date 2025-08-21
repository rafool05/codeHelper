import type { WebrtcProvider } from "y-webrtc";
import Modal from "../BaseModal";
import * as Y from 'yjs'
import { Slider } from "../Slider";
import { useEffect, useState } from "react";

export function PermissionManager({isOpen,onClose,provider,ymap } : {isOpen : boolean, onClose : ()=>void, ymap : Y.Map<any> | null, provider : WebrtcProvider | null}){
    const [permissions, setPermissions] = useState<{[key: string]: boolean}>(ymap?.get('permission') || {});

    useEffect(() => {
        if (!ymap) return;
        const updatePermissions = () => {
            setPermissions({...ymap.get('permission')});
        };
        // Observe permission changes
        ymap.observe(event => {
            if (event.keysChanged.has('permission')) {
                updatePermissions();
            }
        });
        // Initial sync
        updatePermissions();
        return () => {
            // Remove observer if needed (ymap.unobserve)
        };
    }, [ymap]);

    if (!provider || !ymap) return null;
    const names = Array.from(provider.awareness.states.values()).map(v=>v.user?.name)
    const uniques = [...new Set(names)]
    return(
        <Modal isOpen = {isOpen} onClose={()=>{onClose()}} title="Manage Access">
            
            <div>
                {uniques.map((value) => (
                    <div className="flex justify-between items-center text-primary-600 rounded-md px-4 py-2 hover:text-secondary-900 hover:bg-primary-900 transition" key={value}>
                        <div>{value}</div>
                        <Slider isEnabled={permissions[value]} onClick={()=>{
                            const permission = {...ymap.get('permission')}
                            permission[value] = !permission[value]
                            ymap.set('permission',permission)
                        }}/>
                    </div>
                ))}
            </div>
        </Modal>
    )
}