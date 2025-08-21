import clsx from "clsx";

export function Slider({isEnabled, onClick} : {isEnabled : boolean, onClick : ()=>void}){
    return <div className={clsx('w-8 h-2 flex bg-primary-600 rounded-full items-center px-1 py-2 transition-all  hover:cursor-pointer',isEnabled && "bg-secondary-900")} onClick={()=>{onClick()}}>
        <div className={clsx("w-2 h-2 rounded-full bg-primary-900 transition",isEnabled && "translate-x-4")}></div>
    </div>
}