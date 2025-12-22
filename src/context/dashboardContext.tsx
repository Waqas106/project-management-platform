import { createContext, useContext, useEffect, useState  } from "react";

interface ProjectType {
    updatedAt: any;
    createdAt: any;
    _id?: string;
    title: string;
    description: string;
    priority: string;
    dueDate: string;
    status: string;
}

 interface TaskFormType {
    updatedAt: any;
    createdAt: any;
    _id: any;
    title: string;
    description: string;
    dueDate: string;
    projectId: string;
    status: "todo" | "in-progress" | "completed";
    priority: "high" | "medium" | "low";
  };

  interface DashboardStatsType {
    projects: ProjectType[];
    tasks: TaskFormType[];
    loading: boolean;
    refetchAll: () => void;
  }

  const DashboardContext = createContext<DashboardStatsType | null >(null);

  export const DashboardProvider = ({children}: {children:React.ReactNode}) => {
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [tasks, setTasks] = useState<TaskFormType[]>([]);
    const [loading, setIsLoading] = useState(true);

    const token = localStorage.getItem("token");

    const fetchProjects = async () =>{
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:5000/project",{
                headers: {Authorization: `Bearer ${token}`},
            });
            const data = await res.json();

            setProjects(data.projects);
        } catch (error) {
            console.error("error", error);
        }
        setIsLoading(false);
    }


      const fetchTasks = async() =>{
        try {
            const res = await fetch("http://localhost:5000/task", {
                headers:{
                    Authorization : `Bearer ${token}`
                }
            });

            const data = await res.json();
            setTasks(data.tasks);
            // console.log(data.tasks)
        } catch (error) {
            console.error("tasks fetching error", error);
            alert("Task fetching error");
        }
    }

    const refetchAll = async() => {
        setIsLoading(true);
        await Promise.all([fetchProjects(), fetchTasks()]);
        setIsLoading(false);
    }

    useEffect(()=> {
        refetchAll();
    },[]);

    return(
        <DashboardContext.Provider value={{projects, tasks, loading, refetchAll}}>
            {children}
        </DashboardContext.Provider>
    )

  }

     export const useDashboard = () => {
        const ctx = useContext(DashboardContext);
        if (!ctx) {
    throw new Error("useDashboard must be used inside DashboardProvider");
  }

        return ctx;
    }

