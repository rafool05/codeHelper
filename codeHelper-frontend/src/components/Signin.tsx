import  { useState } from "react";
import Input from "./Input";
import { toast } from "react-toastify";

function Signin() {
  const [form, setForm] = useState({ userInfo: "", password: "" });

  return (
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
          <button
            className="bg-primary-600 hover:bg-secondary-900 text-primary-900 font-semibold py-2 rounded transition"
            onClick={()=>{
              handleSignin(form)
            }}
          >
            Sign In
          </button>
        </div>
        <p className="mt-4 text-primary-950 text-md text-center">
          New Here?{" "}
          <button
            className="text-secondary-900 hover:underline"
            onClick={()=>{window.location.href='/signup'}}

          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
async function handleSignin(form : {userInfo : string, password : string}){
  const result = await fetch("http://localhost:8080/signin",{
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
        toast.error(e.message, {
          position: 'top-right',
          autoClose: 2000,
          theme:"dark"
        });
      }, index * 1000); 
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
      window.location.href = "/dashboard"
    });
  }
}
export default Signin;
