"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/lib/useLogin";


const LoginBox = () => {
    // use state  for the inputs
    // const {login, error, isLoading} = useLogin()
    const [username,setUsername] = React.useState("");
    const [password,setPassword] = React.useState("");
    const {login} = useLogin()

    // handle submit
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        
         await login(username,password);
        // router.push('/')
      
      };

  return (
    <>
      <div className="pb-2 sm:pb-0 sm:flex-[1_0_0%]">
        <Input id="email" value={username} type="email" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} required />
      </div>
      <div className="pt-2 sm:pt-0 sm:ps-3 border-t sm:border-t-0 sm:border-s sm:flex-[1_0_0%]">
        <Input id="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password" required />
      </div>
      <div className="pt-2 sm:pt-0 grid sm:block sm:flex-[0_0_auto]">
        
        <Button onClick={handleSubmit} >Get started</Button>
     
      </div>
    </>
  );
};
export default LoginBox;
