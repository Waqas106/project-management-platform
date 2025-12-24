import { Briefcase, Calendar, CircleCheck, Hourglass, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import {useForm} from "react-hook-form";
import { useDashboard } from "../../context/dashboardContext";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function Tasks(){
    const[showForm, setShowForm] = useState(false);
    const {projects, tasks, loading, refetchAll} = useDashboard();

    type TaskFormType = {
    title: string;
    description: string;
    dueDate: string;
    projectId: string;
    status: "todo" | "in-progress" | "completed";
    priority: "high" | "medium" | "low";
  };

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    }= useForm<TaskFormType>();


    const statusStyles:Record<string, string>={
        Active:"bg-blue-600/15 text-blue-600",
        "In Progress":"bg-yellow-400/15 text-yellow-800",
        Completed:"bg-green-600/15 text-green-600",
        "To Do":"bg-red-400/15 text-red-400"
    }

    const priorityStyles:Record<string, string>={
        high:"bg-red-400/15 text-red-400",
        low: "bg-green-600/15 text-green-600",
        medium:"bg-yellow-400/15 text-yellow-800"
    }

    const onSubmitTask = async (data: TaskFormType) => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:5000/task/create", {
                method: "POST",
                headers:{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if(result.success){
                alert("Task created");
                reset();
                setShowForm(!showForm);
                refetchAll();
            } else {
                alert(result.message || "failed to create task")
            }


        } catch (error) {
            console.error("task creating error", error);
            
        }
    }

    const todoTasks = tasks.filter(t => t.status === "todo");
    const inProgressTasks = tasks.filter(t => t.status === "in-progress");
    const completedTasks = tasks.filter(t => t.status === "completed");

    const upcomingDeadlinesCount = tasks.filter((task) => {
        const today = new Date();
        const due = new Date(task.dueDate);
        const DiffInDays = (due.getTime() - today.getTime())/(1000* 60 *60 *24);

        return DiffInDays > 0 && DiffInDays <= 7;
    }).length

        const productivity=[
        {
            title:"Completed Tasks",
            num: completedTasks.length,
            icon:CircleCheck,
            status:"Completed"
        },
        {
            title:"Upcoming Deadlines",
            num:upcomingDeadlinesCount,
            icon:Hourglass,
            status:"In Progress"
        },
        {
            title:"Active Projects",
            num: projects.length,
            icon:Briefcase,
            status:"Active"
        }
    ]


const handleDragEnd = async (result: any) => {
  const { source, destination, draggableId } = result;

  if (!destination) return;
  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  ) return;

  const newStatus = destination.droppableId;

  try {
    await updateTaskStatus(draggableId, newStatus);
    await refetchAll(); 
  } catch (error) {
    console.error("Failed to update task status", error);
  }
};

const updateTaskStatus = async (taskId: string, status: string) => {
    const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:5000/task/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization : `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error("Failed to update task status");
  }

  return res.json();
};




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

            {showForm && ( 
            <form
              onSubmit={handleSubmit(onSubmitTask)}
              className="space-y-4 bg-white p-6 rounded-md shadow"
            >
              <div>
                <label className="block font-semibold mb-1">Project</label>
                <select
                  {...register("projectId", { required: true })}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="">Select Project</option>
                  {projects?.map((proj) => (
                    <option key={proj._id} value={proj._id}>
                      {proj.title}
                    </option>
                  ))}
                </select>
                {errors.projectId && <p className="text-red-500 text-sm">Project required</p>}
              </div>
            
              <div>
                <label className="block font-semibold mb-1">Task Title</label>
                <input
                  {...register("title", { required: true })}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Enter task title"
                />
              </div>
            
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  {...register("description")}
                  className="w-full border rounded-md px-3 py-2"
                  rows={3}
                />
              </div>
            
              <div>
                <label className="block font-semibold mb-1">Due Date</label>
                <input
                  type="date"
                  {...register("dueDate")}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
            
              <div>
                <label className="block font-semibold mb-1">Status</label>
                <select
                  {...register("status")}
                  className="w-full border rounded-md px-3 py-2"
                  defaultValue="todo"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Priority</label>
                <select
                  {...register("priority")}
                  className="w-full border rounded-md px-3 py-2"
                  defaultValue="medium"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Create Task
              </button>
            </form>
            )}

            <div>
                <div className="py-4 flex justify-between items-center mb-4">
                    <h3 className="text-3xl font-bold">My Task Board</h3>
                    <div>
                        <button className="flex gap-2 items-center px-4 py-2 rounded-md bg-blue-600 text-white font-bold hover:scale-102 transition duration-200 cursor-pointer "
                        onClick={()=> setShowForm(!showForm)}
                        >
                        <Plus size={20}/>
                        New Task
                        </button>
                    </div>
                </div>
                <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-3 gap-6">
                    <Droppable droppableId="todo">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="bg-gray-400/6 rounded-lg space-y-2"
                        >
                        <div className="flex justify-between px-6 py-4 border-b-4 border-red-400">
                            <h3 className="text-lg font-bold">To Do</h3>
                            <span className={`px-2 py-1 font-semibold rounded-full ${statusStyles["To Do"]}`}>{todoTasks.length}</span>
                        </div>
                        <div className="flex flex-col px-6 py-2 gap-3">
                            {todoTasks.map((task, idx)=>(
                                <Draggable key={task._id} draggableId={task._id} index={idx}>
                                {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="p-3 bg-white rounded-lg"
                                  >
                                    <h3 className="text-lg font-semibold pb-2">{task.title}</h3>
                                    <div className="flex justify-between text-sm">
                                        <span className="flex gap-2 items-center">
                                            <Calendar size={15} />
                                            {task.dueDate.toString().split("T")[0]}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityStyles[task.priority]}`}>{task.priority}</span>
                                    </div>
                                </div>
                                )}
                            </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    </div>
                    )}
                    </Droppable>

                    <Droppable droppableId="in-progress">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="bg-gray-400/6 rounded-lg space-y-2"
                        >
                        <div className="flex justify-between px-6 py-4 border-b-4 border-yellow-400">
                            <h3 className="text-lg font-bold">In Progress</h3>
                            <span className={`px-2 py-1 font-semibold rounded-full ${statusStyles["In Progress"]}`}>{inProgressTasks.length}</span>
                        </div>
                        <div className="flex flex-col px-6 py-2 gap-3">
                            {inProgressTasks.map((task, idx)=>(
                                <Draggable key={task._id} draggableId={task._id} index={idx}>
                                {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="p-3 bg-white rounded-lg"
                                  >
                                    <h3 className="text-lg font-semibold pb-2">{task.title}</h3>
                                    <div className="flex justify-between text-sm">
                                        <span className="flex gap-2 items-center">
                                            <Calendar size={15} />
                                            {task.dueDate.toString().split("T")[0]}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityStyles[task.priority]}`}>{task.priority}</span>
                                    </div>
                                </div>
                                )}
                            </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    </div>
                    )}
                    </Droppable>

                    <Droppable droppableId="completed">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="bg-gray-400/6 rounded-lg space-y-2"
                        >
                        <div className="flex justify-between px-6 py-4 border-b-4 border-green-400">
                            <h3 className="text-lg font-bold">Completed</h3>
                            <span className={`px-2 py-1 font-semibold rounded-full ${statusStyles["Completed"]}`}>{completedTasks.length}</span>
                        </div>
                        <div className="flex flex-col px-6 py-2 gap-3">
                            {completedTasks.map((task, idx)=>(
                                <Draggable key={task._id} draggableId={task._id} index={idx}>
                                {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="p-3 bg-white rounded-lg"
                                  >
                                    <h3 className="text-lg font-semibold pb-2">{task.title}</h3>
                                    <div className="flex justify-between text-sm">
                                        <span className="flex gap-2 items-center">
                                            <Calendar size={15} />
                                            {task.dueDate.toString().split("T")[0]}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityStyles[task.priority]}`}>{task.priority}</span>
                                    </div>
                                </div>
                                )}
                            </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    </div>
                    )}
                    </Droppable>                
                </div>
                </DragDropContext>
            </div>
        </div>
    )
}