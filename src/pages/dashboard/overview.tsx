import { CircleCheckBig, ClockFading, Zap } from "lucide-react";
import MiniChart from "../../components/dashboard/miniChart";
import { useDashboard } from "../../context/dashboardContext";

function OverView(){

    const { projects, tasks} = useDashboard();

    const activeProjects = projects.filter(p => p.status === "active").length;
    const compProjects = projects.filter(p => p.status === "completed").length;
    const pendingTasks = tasks.filter(t => t.status !== "completed").length;

    const overviewCards=[
        {
            head:"Active Projects",
            icon: Zap,
            num:activeProjects,
            status: "Active"
        },
        {
            head:"Completed Projects",
            icon: CircleCheckBig,
            num:compProjects,
            status:"Completed"
        },
        {
            head:"Pending Tasks",
            icon: ClockFading,
            num:pendingTasks,
            status:"Pending"
        }
    ]

    type ActivityTypes = {
        id : string;
        message: string;
        time: string;
    }

    const activities: ActivityTypes[] = [
        ...projects.map((p) => ({ 
            id: p._id,
            message: `Project "${p.title}" created`,
            time: p.createdAt,
        })),

        ...projects.map((p) => ({ 
            id: p._id,
            message: `Project "${p.title}" edited`,
            time: p.updatedAt,
        })),

        ...tasks.map((t) => ({
            id: t._id,
            message: `Task "${t.title}" created`,
            time: t.createdAt,
        })),

        ...tasks.map((t) => ({
            id: t._id,
            message: `Task "${t.title}" marked as ${t.status}`,
            time: t.updatedAt,
        })),
    ];

    const recentActivities = activities
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 5);

    const timeAgo = (date: string) => {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  return `${days} days ago`;
};

    const upcomingDeadlines = tasks.filter(t => {
        const today = new Date();
        const due = new Date(t.dueDate);
        const DiffInDays = (due.getTime() - today.getTime())/(1000* 60 *60 *24);
        return DiffInDays >= 0 && DiffInDays <= 7 && t.status !== "completed";
    })

    const getProjectName = (projectId : string) => {
        const project = projects.find(p => p._id === projectId);
        return project ? project.title : "Unknown Project";
    }

    const statusStyles: Record<string, string> = {
        Active: "text-blue-600 bg-blue-600/15",
        Pending: "text-yellow-600 bg-yellow-400/15",
        Completed: "text-green-600 bg-green-400/15"
    }

    const name = localStorage.getItem("name");
    
    return(
        <div className="px-6 py-4">
            <div className="px-4 py-2 my-4">
                <h2 className="text-3xl font-bold">Welcome Back, {name}!</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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
            <div className="flex flex-col sm:flex-row gap-6 mt-6">
                <div className="flex-1 p-4 bg-white rounded-lg shadow-sm">
                    <h3 className="text-lg font-bold pb-3">Upcoming Deadlines</h3>
                    <div className="space-y-2">
                        {upcomingDeadlines.map((deadline, idx)=>(
                            <div key={idx} className="flex flex-col md:flex-row justify-between bg-gray-100/10 rounded-md px-4 py-2">
                                <div className="space-y-1">
                                    <h3 className="text-md text-gray-700"> 
                                    <span className="font-bold">Project: </span>
                                     {getProjectName(deadline.projectId)}
                                    </h3>
                                    <h4 className="text-sm text-gray-600">
                                        <span className="font-semibold">Task: </span>
                                        {deadline.title}
                                    </h4>
                                </div>
                                <div>
                                    <p>
                                        <span className="font-semibold">Due: </span>
                                        {deadline.dueDate.toString().split("T")[0]}
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
                        {recentActivities.map((act, idx)=>(
                            <div key={idx}>
                                <p className="text-md text-gray-700">{act.message}</p>
                                <span className="text-sm text-gray-400">{timeAgo(act.time)}</span>
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