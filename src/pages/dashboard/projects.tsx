import { CalendarDays, Cross, Plus } from "lucide-react";
import { useState } from "react";
import {useForm} from "react-hook-form";
import { useDashboard } from "../../context/dashboardContext";

interface ProjectType {
    _id?: string;
    title: string;
    description: string;
    priority: string;
    dueDate: string;
}

export default function Projects(){
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState<ProjectType | null >(null);
    const {projects, loading, refetchAll} = useDashboard();

    const{register, reset, handleSubmit} = useForm<ProjectType>({});

    const priorityStyles :Record<string, string>= {
        "high": "text-red-400 bg-red-400/15",
        "medium" : "text-yellow-600 bg-yellow-400/15",
        "low": "text-green-600 bg-green-300/15"
    }


    const onSubmit = async (data: ProjectType) =>{
        try {
            const token = localStorage.getItem("token");
            const url = editingProject ? `http://localhost:5000/project/${editingProject._id}` : "http://localhost:5000/project/create";
            const Method = editingProject ? "PUT" : "POST";
            const res = await fetch(url, {
                method: Method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if(result.success){
                alert(editingProject? "Project Updated" : "Project Created");
                reset();
                setShowForm(false);
                setEditingProject(null);
                refetchAll();
            } else {
                alert(result.message || "Operation failed");
            }
        } catch (error) {
            console.error("Server error", error);
        }
    }


    const editProject = (projects: ProjectType) =>{
        setEditingProject(projects);
        setShowForm(true);
        reset(projects);
    }

    const delProject = async(id?: string) => {
        const confirm = window.confirm("Are you sure you want to delete");
        if(!confirm){
            return;
        }

        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:5000/project/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            },  
        })
        
        const result = await res.json();

        if(result.success){
            alert("Project deleted");
            refetchAll();
        } else {
            alert(result.message || "Delete Failed");
        }
    }


    return(
        <div className="px-8 py-4 space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between my-4 sm:items-center">
                <div>
                    <h2 className="text-3xl font-bold pb-2">Projects</h2>
                    <p className="text-gray-600 ">Here's the list of all your active projects.</p>
                </div>
                <div>
                    <button onClick={()=> setShowForm(!showForm)} className="flex gap-2 items-center px-4 py-2 my-2 sm:my-0 rounded-md bg-blue-600 text-white font-bold hover:scale-102 transition duration-200 cursor-pointer ">
                    {showForm? <Cross size={20} /> : <Plus size={20}/> } 
                    {showForm? "Cancel" : "Add Project"}
                    </button>
                </div>
            </div>

            {showForm && (
             <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg mx-auto">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col space-y-4"
              >
                <input
                  type="text"
                  placeholder="Project Title"
                  {...register("title", { required: true })}
                  className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
                  required
                />
                <textarea
                  placeholder="Project Description"
                  {...register("description")}
                  className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
                />
                <input
                  type="date"
                  {...register("dueDate")}
                  className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
                />
                <select
                  {...register("priority")}
                  className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  {editingProject ? "Update Project" : "Create Project"}
                </button>
              </form>
            </div>
            )}


            {loading? (
                <p>Loading projects....</p>
            ): projects?.length === 0 ? (
                <p className="text-gray-500 text-center mt-4">
                  No projects found. Click "Add Project" to create one.
                </p>
            ) : (
            <div className="flex flex-col gap-4">
                {projects?.map((proj)=>(
                    <div key={proj._id} className="flex flex-col sm:flex-row justify-between gap-6 sm:items-center px-6 py-4 bg-white rounded-md shadow-sm hover:shadow-md">
                        <div>
                            <span className={`mb-2 text-xs px-2 py-1 rounded-md ${priorityStyles[proj.priority]}`} >{proj.priority}</span>
                            <h3 className="text-lg font-bold pb-2">{proj.title}</h3>
                            <p className="text-gray-600 ">{proj.description}</p>
                        </div>
                        <div className="space-y-2 flex-none">
                            <span className="flex gap-1 items-center ">
                                <CalendarDays size={18}/>
                                Due: {proj.dueDate.toString().split("T")[0]}
                            </span>
                            <div className="flex gap-2 text-sm ">
                                <button onClick={() => editProject(proj)} className="cursor-pointer">
                                    edit
                                </button>
                                <button onClick={()=> delProject(proj._id)} className="cursor-pointer">
                                    delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <div onClick={()=> setShowForm(!showForm)} className=" space-y-4 items-center px-6 py-6 border-2 border-dashed border-gray-400 rounded-lg hover:border-blue-500 hover:bg-blue-400/8 ">
                    <Plus size={30}/>
                    <h3 className="text-2xl text-gray-600">Add New Project</h3>
                </div>
            </div>
            )}
        </div>
    )
}