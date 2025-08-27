import { backend_url } from '../utils/getBackendUrl';
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { Navigate, useParams } from "react-router-dom";

export function RequireRoomAccess({children} : {children : any}){
    const [roomAccess, setRoomAccess] = useState<null | boolean>(null)
    const {room_id} = useParams()
    useEffect(()=>{
        (async ()=>{
            const roomResponse = await fetch(`${backend_url}/getRoomData?`+new URLSearchParams({hash : room_id as string}),
            {credentials:"include"})
            if(!roomResponse.ok){
                setRoomAccess(false)
            }
            else{
                setRoomAccess(true)
            }
        })()
    },[])
    if(roomAccess == null) return <Loading/>
    if(!roomAccess) return <Navigate to = "/dashboard" replace/>
    return children

}