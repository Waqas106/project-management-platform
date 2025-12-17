import { Outlet } from "react-router-dom";
import SideBar from "../../components/dashboard/sideBar";
import TopBar from "../../components/dashboard/topBar";

export default function UserDashboard(){
    return(
        <div className="flex bg-gray-100">
            <aside className="sticky top-0 left-0  ">
            <SideBar/>
            </aside>
            <main className="flex-1">
                <TopBar/>
                <Outlet/>
            </main>
        </div>
    )
}