import { CircleCheckBig, ClockFading, Zap } from "lucide-react";
import MiniChart from "../../components/dashboard/miniChart";

function OverView(){
    const overviewCards=[
        {
            head:"Active Projects",
            icon: Zap,
            num:"12",
            status: "Active"
        },
        {
            head:"Completed Projects",
            icon: CircleCheckBig,
            num:"9",
            status:"Completed"
        },
        {
            head:"Pending Tasks",
            icon: ClockFading,
            num:"27",
            status:"Pending"
        }
    ]

    const Activity=[
        {
            text:"Ali completed task “API Integration” ",
            time:"2 hours ago"
        },
        {
            text:"Waqas created new project “CRM System”",
            time:"3 hour ago"
        }
    ]

    const deadlines =[
        {
            project:"Planify Dashboard",
            task:"Frontend UI review",
            due:"Oct 23, 2025",
            status:"Pending"
        },
         {
            project:"Planify Dashboard",
            task:"Frontend UI review",
            due:"Oct 23, 2025",
            status:"Pending"
        },
         {
            project:"Planify Dashboard",
            task:"Frontend UI review",
            due:"Oct 23, 2025",
            status:"Pending"
        },
        
    ]

    const statusStyles: Record<string, string> = {
        Active: "text-blue-600 bg-blue-600/15",
        Pending: "text-yellow-600 bg-yellow-400/15",
        Completed: "text-green-600 bg-green-400/15"
    }
    
    return(
        <div className="px-6 py-4">
            <div className="px-4 py-2 my-4">
                <h2 className="text-3xl font-bold">Welcome Back, Waqas!</h2>
            </div>
            <div className="grid grid-cols-3 gap-6">
                {overviewCards.map((card, idx)=>{
                    const Icons = card.icon;
                    return(
                    <div key={idx} className="px-4 py-4 bg-white rounded-md shadow-sm hover:shadow-lg">
                        
                        <div className="flex justify-between items-center">
                            <h3 className="text-gray-500">{card.head}</h3>
                            <Icons size={40}  className={`p-2 rounded-md ${statusStyles[card.status]} `}/>
                        </div>
                        <p className="text-3xl font-bold mt-2">{card.num}</p>
                    </div> 
                    )
                })}
            </div>
            <div className="flex gap-6 mt-6">
                <div className="flex-1 p-4 bg-white rounded-lg shadow-sm">
                    <h3 className="text-lg font-bold pb-3">Upcoming Deadlines</h3>
                    <div className="space-y-2">
                        {deadlines.map((deadline, idx)=>(
                            <div key={idx} className="flex justify-between bg-gray-100/10 rounded-md px-4 py-2">
                                <div className="space-y-1">
                                    <h3 className="text-md text-gray-700"> 
                                    <span className="font-bold">Project: </span>
                                     {deadline.project}
                                    </h3>
                                    <h4 className="text-sm text-gray-600">
                                        <span className="font-semibold">Task: </span>
                                        {deadline.task}
                                    </h4>
                                </div>
                                <div>
                                    <p>
                                        <span className="font-semibold">Due: </span>
                                        {deadline.due}
                                    </p>
                                    <p className="text-yellow-600" >{deadline.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm ">
                    <h3 className="text-lg font-bold pb-3">Recent Activity</h3>
                    <div className="space-y-3">
                        {Activity.map((act, idx)=>(
                            <div key={idx}>
                                <p className="text-md text-gray-700">{act.text}</p>
                                <span className="text-sm text-gray-400">{act.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <MiniChart/>
        </div>
    )
}

export default OverView;