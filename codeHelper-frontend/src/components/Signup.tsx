import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Input from "./Input";
import {toast} from 'react-toastify';
import logo from '../assets/logo.png'
import { Button } from '../ui/Button';
import { ToastError, ToastSuccess } from "../utils/toast";
import { backend_url } from '../utils/getBackendUrl';
function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Signup';
  }, []);
  return (
    <>
      <img src = {logo} className="absolute w-20 h-20 top-5 left-10 cursor-pointer" onClick={()=>{navigate('/')}}/>

      <div className="h-screen flex items-center justify-center bg-primary-900">
        <div className="bg-primary-800 py-4 px-8 rounded-md h-[70%] shadow-lg w-96 flex flex-col justify-around">
          <h2 className="text-3xl font-semibold text-primary-950 text-center">
            Sign Up
          </h2>
          <div className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, username: e.target.value })} 
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, email: e.target.value })}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                minLength={6}
                value={form.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)  => setForm({ ...form, password: e.target.value })}
                required
              />
              <Button
                type="submit"
                onClick={(): void => {handleSignup(form, navigate)}}
                variant="pos-cta"
                size="lg"
                className="w-full"
              >
                Sign Up
              </Button>
          </div>
          <p className="mt-4 text-primary-950 text-md text-center">
            Already have an account?{" "}
            <span
              onClick={()=>{navigate('/signin')}}
              className="w-full text-secondary-800 hover:underline transition-all"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </>

  );
}
async function handleSignup(form : {username : string, password : string, email : string}, navigate: any){
  // console.log("here")
  try{
  const result = await fetch(`${backend_url}/signup`,{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        username : form.username,
        password : form.password,
        email : form.email
      }),
      credentials:"include"
    })
    const jsonResult = await result.json()
    // console.log(jsonResult.errors)
    if(jsonResult.errors){
      jsonResult.errors.forEach((e: { message: string }, index: number) => {
        setTimeout(() => {
          ToastError(e.message)
        }, index * 1000); // delay increases by 500ms for each error
      });
    }
    else{
      jsonResult.messages.forEach((e: { message: string }, index: number) => {
        setTimeout(() => {
          ToastSuccess(e.message)
        }, index * 1000); // delay increases by 500ms for each error
      });

    }
  }
  catch(e){
    toast.error("Unexpected Error",{
      position : 'top-right',
      autoClose : 2000,
      theme : "dark"
    })
  }
}
export default Signup;
