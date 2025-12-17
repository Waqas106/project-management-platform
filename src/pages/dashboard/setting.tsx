import { Briefcase, Calendar, CircleCheck, Hourglass, Plus } from "lucide-react";

export default function Setting(){
    const productivity=[
        {
            title:"Completed Tasks",
            num:"12",
            icon:CircleCheck,
            status:"Completed"
        },
        {
            title:"Upcoming Deadlines",
            num:"4",
            icon:Hourglass,
            status:"In Progress"
        },
        {
            title:"Active Projects",
            num:"2",
            icon:Briefcase,
            status:"Active"
        }
    ]

    const tasks=[
        {
            title:"Design the new user onboarding flow",
            due:"Oct 31",
            priority:"High"
        },
        {
            title:"Develop API for user authentication",
            due:"Nov 5",
            priority:"Medium"
        },
        {
            title:"Setup project repository on GitHub",
            due:"Nov 28",
            priority:"Low"
        }
    ]

    const statusStyles:Record<string, string>={
        Active:"bg-blue-600/15 text-blue-600",
        "In Progress":"bg-yellow-400/15 text-yellow-800",
        Completed:"bg-green-600/15 text-green-600",
        "To Do":"bg-red-400/15 text-red-400"
    }

    const priorityStyles:Record<string, string>={
        High:"bg-red-400/15 text-red-400",
        Low: "bg-green-600/15 text-green-600",
        Medium:"bg-yellow-400/15 text-yellow-800"
    }

    return(
        <div className="px-8 py-4 space-y-4">
            <div>
                <h3 className="text-3xl font-bold my-4">My Productivity</h3>
                <div className="grid grid-cols-3 gap-4">
                    {productivity.map((prod, idx)=>{
                    const Icons = prod.icon;
                    return(
                        <div key={idx} className="flex gap-4 items-center px-4 py-4 bg-white rounded-md">
                            <Icons size={50} className={`p-2 rounded-md ${statusStyles[prod.status]}`}/>
                            <div className="space-y-1">
                                <h4 className="text-md text-gray-600 ">{prod.title}</h4>
                                <p className="text-3xl font-bold">{prod.num}</p>
                            </div>
                        </div>
                    )
                    })}
                </div>
            </div>
            <div>
                <div className="py-4 flex justify-between items-center mb-4">
                    <h3 className="text-3xl font-bold">My Task Board</h3>
                    <div>
                        <button className="flex gap-2 items-center px-4 py-2 rounded-md bg-blue-600 text-white font-bold hover:scale-102 transition duration-200 cursor-pointer ">
                        <Plus size={20}/>
                        New Task
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-gray-400/6 rounded-lg space-y-2">
                        <div className="flex justify-between px-6 py-4 border-b-4 border-red-400">
                            <h3 className="text-lg font-bold">To Do</h3>
                            <span className={`px-2 py-1 font-semibold rounded-full ${statusStyles["To Do"]}`}>{tasks.length}</span>
                        </div>
                        <div className="flex flex-col px-6 py-2 gap-3">
                            {tasks.map((task, idx)=>(
                                <div key={idx} className="p-3 bg-white rounded-lg">
                                    <h3 className="text-lg font-semibold pb-2">{task.title}</h3>
                                    <div className="flex justify-between text-sm">
                                        <span className="flex gap-2 items-center">
                                            <Calendar size={15} />
                                            Oct 31
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityStyles[task.priority]}`}>{task.priority}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-400/6 rounded-lg space-y-2">
                        <div className="flex justify-between px-6 py-4 border-b-4 border-yellow-400">
                            <h3 className="text-lg font-bold">In Progress</h3>
                            <span className={`px-2 py-1 font-semibold rounded-full ${statusStyles["In Progress"]}`}>{tasks.length}</span>
                        </div>
                        <div className="flex flex-col px-6 py-2 gap-3">
                            {tasks.map((task, idx)=>(
                                <div key={idx} className="p-3 bg-white rounded-lg">
                                    <h3 className="text-lg font-semibold pb-2">{task.title}</h3>
                                    <div className="flex justify-between text-sm">
                                        <span className="flex gap-2 items-center">
                                            <Calendar size={15} />
                                            Oct 31
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityStyles[task.priority]}`}>{task.priority}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-400/6 rounded-lg space-y-2">
                        <div className="flex justify-between px-6 py-4 border-b-4 border-green-400">
                            <h3 className="text-lg font-bold">Completed</h3>
                            <span className={`px-2 py-1 font-semibold rounded-full ${statusStyles["Completed"]}`}>{tasks.length}</span>
                        </div>
                        <div className="flex flex-col px-6 py-2 gap-3">
                            {tasks.map((task, idx)=>(
                                <div key={idx} className="p-3 bg-white rounded-lg">
                                    <h3 className="text-lg font-semibold pb-2">{task.title}</h3>
                                    <div className="flex justify-between text-sm">
                                        <span className="flex gap-2 items-center">
                                            <Calendar size={15} />
                                            Oct 31
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityStyles[task.priority]}`}>{task.priority}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>                
                </div>
            </div>
        </div>
    )
}