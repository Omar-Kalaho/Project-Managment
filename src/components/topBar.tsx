import LogoutButton from "./logoutButton";

const TopBar = () => {
    return(
    
    <nav className = "w-full h-1/3 p-3 mt-0.1 bg-green-950 relative flex">
        <h1 className=" text-white font-bold m-auto text-3xl"> SABIS&reg; Science Project Platform</h1>
        <div className="absolute right-0">
        <LogoutButton/>
    </div>
    </nav>
    
   
)
}
export default TopBar;