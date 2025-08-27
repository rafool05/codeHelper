import { backend_url } from '../utils/getBackendUrl';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Input from "./Input";
import logo from '../assets/logo.png'
import { Button } from '../ui/Button';
import { ToastError, ToastSuccess } from "../utils/toast";
function Signin() {
  const [form, setForm] = useState({ userInfo: "", password: "" });
  const navigate = useNavigate();
  useEffect(()=>{
    document.title = 'Signin'
  },[])
  return (
    <>
      <img src = {logo} className="absolute w-20 h-20 top-5 left-10 cursor-pointer" onClick={()=>{navigate('/')}}/>
      <div className="h-screen flex items-center justify-center bg-primary-900">
        <div className="bg-primary-800 py-4 px-8 rounded-md h-[70%] shadow-lg w-96 flex flex-col justify-around">
          <h2 className="text-3xl font-semibold text-primary-950 text-center">
            Sign In
          </h2>
          <div
            className="flex flex-col gap-4"
          >
            <Input
              type="text"
              placeholder="Username/Email"
              value={form.userInfo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, userInfo: e.target.value })}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              minLength={6}
              value={form.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, password: e.target.value })}
              required
            />
              <Button
                onClick={()=>{handleSignin(form, navigate)}}
                variant="pos-cta"
                size="lg"
                className="w-full"
              >
                Sign In
              </Button>
          </div>
          <p className="mt-4 text-primary-950 text-md text-center">
            New Here?{" "}
            <span
              onClick={()=>{navigate('/signup')}} 
              className="w-full text-secondary-800 hover:underline transition-all"
            > 
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </>

  );
}
async function handleSignin(form : {userInfo : string, password : string}, navigate:any){
  const result = await fetch(`${backend_url}/signin`,{
    method : "POST",
    body : JSON.stringify({
      userInfo : form.userInfo,
      password : form.password
    }),
    headers :{
      "Content-type" : "application/json"
    },
    credentials : "include"
  })
  const jsonResult = await result.json();
  // console.log(jsonResult)
  if(jsonResult.errors){
    jsonResult.errors.forEach((e: { message: string }, index: number) => {
      setTimeout(() => {
    ToastError(e.message);
      }, index * 1000); 
    });
  }
  else{
    jsonResult.messages.forEach((e: { message: string }, index: number) => {
      setTimeout(() => {
    ToastSuccess(e.message);
      }, index * 1000); // delay increases by 500ms for each error
      navigate('/dashboard')
    });
  }
  
}
export default Signin;
