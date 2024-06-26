// create a logout button that has an icon of logout
'use client'
import {useLogout}  from "../lib/useLogout"
import {ExitIcon} from "@radix-ui/react-icons"
export default function LogoutButton() {
  const {user,logout} = useLogout()

  return (
   user&& <button onClick={logout} className="flex items-center justify-center gap-2 rounded-md px-4 py-2 text-white hover:bg-red-600">
      <ExitIcon />
      Logout
    </button>
  );
}