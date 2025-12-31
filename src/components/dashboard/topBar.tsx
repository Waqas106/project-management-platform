import { Bell, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const notification=[
    
]



function TopBar(){
    const [notfOpen, setNotfOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const navigate = useNavigate();

    const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
}

    return(
        <header className="flex sticky z-10 top-0 gap-4 justify-end bg-white px-4 py-4 shadow-sm items-center">
            <div className="relative cursor-pointer" onClick={()=>setNotfOpen(!notfOpen) }>
                <Bell size={20}/>
                {notification.length > 0 && (<span className="absolute top-[-5px] right-0  text-red-600 text-xs w-2 h-2">{notification.length}</span> )}
            </div>
            {notfOpen && (
                <div className="absolute top-15 right-30 px-4 py-2 bg-white rounded-md shadow-md">
                    <h4 className="text-md font-bold mb-2"> Notifications</h4>
                    {notification.length > 0 ? (
                        <p>New Notifications</p>
                    ) : (
                        <p>No New Notifications</p>
                    )}
                </div>
            )}

            <div className="bg-gray-300 rounded-full w-8 h-8 cursor-pointer" onClick={()=> setOpenProfile(!openProfile)}></div>
            {openProfile && (
                <div className="absolute top-15 right-5 px-4 py-2 space-y-6 bg-white rounded-md shadow-md">
                    <Link to="profile" className="hover:text-blue-600 font-semibold"> Profile</Link>
                    <button onClick={()=> logout()} className=" flex items-center gap-1 hover:text-red-500 font-semibold"> 
                    <LogOut size={18}/>
                     Logout
                    </button>
                </div>
            )}
        </header>
    )
}

export default TopBar;