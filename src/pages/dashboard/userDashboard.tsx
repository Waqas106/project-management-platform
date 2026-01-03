import { Outlet } from "react-router-dom";
import SideBar from "../../components/dashboard/sideBar";
import TopBar from "../../components/dashboard/topBar";
import { DashboardProvider } from "../../context/dashboardContext";
import { useState } from "react";
import { ArrowBigRightDash, ArrowBigLeftDash } from "lucide-react";

export default function UserDashboard(){
    const[showSideBar, setShowSideBar] = useState(false);
    return(
        <div className="flex bg-gray-100">
            <button onClick={()=> setShowSideBar(!showSideBar)} className="md:hidden bg-blue-600 text-white border-md w-8 h-8">
                <ArrowBigRightDash size={20} />
            </button>
            <aside className={`fixed top-0 left-0 h-screen min-w-32 md:w-64 z-50
                   transform ${showSideBar? "translate-x-0" : "-translate-x-full"} md:translate-x-0  transition-transform duration-300`} >
            <button onClick={()=> setShowSideBar(!showSideBar)} className="md:hidden bg-blue-600 text-white border-md w-8 h-8">
                <ArrowBigLeftDash size={20} />
            </button>
            <SideBar/>
            </aside>
            <main className="flex-1 ml-0 md:ml-64 transition-all duration-300">
                <DashboardProvider>
                <TopBar/>
                <Outlet/>
                </DashboardProvider>
            </main>
        </div>
    )
}