'use client'
import { useRouter } from 'next/navigation'
import { AuthContext } from "./context";
import { useContext } from 'react';

export const useLogout = () => {
    const { user ,dispatch }: any = useContext(AuthContext);
    const router = useRouter()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    router.push('/')

  }

  return { user,logout }
}