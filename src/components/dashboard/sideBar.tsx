import { ChartPie, FolderOpen, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

function SideBar(){
    const navigationLinks=[
        {
            href:"overview",
            name:"Overview",
            icon: ChartPie
        },
        {
            href:"projects",
            name:"Projects",
            icon: FolderOpen
        },
        {
            href:"tasks",
            name:"Tasks",
            icon: Settings
        }
    ]

    return(
        <div className="bg-white shadow-[3px_0_6px_rgba(0,0,0,0.02)] min-h-screen w-[20vw]">
            <div className="text-3xl font-bold py-4 text-center border-b-1 border-dashed border-gray-300">
                <h2>Planify</h2>
            </div>
            <div className="flex flex-col gap-2 px-6 py-4">
                {navigationLinks.map((link,idx)=>{
                    const Icons = link.icon;
                    return(
                    <NavLink key={idx} to={link.href}
                    className={ ({isActive}) =>  ( isActive ? "flex gap-2 items-center text-lg font-semibold py-2 px-2 bg-blue-600/10 rounded-lg text-blue-600 border-r-2 border-blue-600" : "flex gap-2 text-lg items-center rounded-lg font-semibold py-2 px-2 hover:text-blue-600 hover:bg-blue-600/10 ") }
                    >
                    <Icons size={18}  className="font-bold"/>
                        {link.name}
                    </NavLink>
                    )
                })}
            </div>
        </div>
    )
}

export default SideBar;