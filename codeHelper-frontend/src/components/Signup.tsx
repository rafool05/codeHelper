import  { useState } from "react";
import Input from "./Input";
import {toast} from 'react-toastify';
function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  return (
    <div className="h-screen flex items-center justify-center bg-primary-900">
      <div className="bg-primary-800 py-4 px-8 rounded-md h-[70%] shadow-lg w-96 flex flex-col justify-around">
        <h2 className="text-3xl font-semibold text-primary-950 text-center">
          Sign Up
        </h2>
        <div
          className="flex flex-col gap-4"
        >
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
          <button
            className="bg-primary-600 cursor-pointer hover:bg-secondary-900 text-primary-900 font-semibold py-2 rounded transition"
            type="submit"
            onClick={(): void => {handleSignup(form)}}
          >
            Sign Up
          </button>
        </div>
        <p className="mt-4 text-primary-950 text-md text-center">
          Already have an account?{" "}
          <button
            className="text-secondary-900 hover:underline"
            onClick={()=>{window.location.href='/signin'}}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
async function handleSignup(form : {username : string, password : string, email : string}){
  // console.log("here")
  try{
    const result = await fetch("http://localhost:8080/signup",{
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
          toast.error(e.message, {
            position: 'top-right',
            autoClose: 2000,
            theme:"dark"
          });
        }, index * 1000); // delay increases by 500ms for each error
      });
    }
    else{
      jsonResult.messages.forEach((e: { message: string }, index: number) => {
        setTimeout(() => {
          toast.success(e.message, {
            position: 'top-right',
            autoClose: 2000,
            theme:"dark"
          });
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
