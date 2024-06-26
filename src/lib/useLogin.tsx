"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../lib/context";
export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch }: any = useContext(AuthContext);
  const router = useRouter()

  // login
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await res.json();

    if (!res.ok) {
      setIsLoading(false)
      setError(data.error)
    }
    if (res.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(data));
      // update the auth context
      dispatch({ type: "LOGIN", payload:data });
      // update loading state
      if(data.userType=='student'){
       router.push('/student')
      }
      else if(data.userType=='admin'){
        router.push('/admin')
      }

      
    }
  };
  return { login };
};
