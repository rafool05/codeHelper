function Input(props:any){
    return <input
        className="w-full px-3 py-2 rounded bg-primary-600 text-primary-900 placeholder-primary-700 ring-primary-600 text-primary-100 outline-none ring-1 focus:ring-primary-900 focus:shadow-[0px_0px_6px_1px] focus:shadow-primary-900"
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        
    />
}
export default Input