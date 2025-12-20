import Task from "../models/task.js";

export const createTask = async(req, res) => {
    try {
        const{title, description, status, priority, dueDate, projectId} = req.body;

    if(!title || !projectId){
        return res.status(400).json({
            success: false,
            message: "Title and project is required"
        });
    }

    const task = await Task.create({
        projectId,
        userId: req.user._id,
        title,
        description: description || "",
        status: status || "todo",
        priority: priority,
        dueDate: dueDate,
    });

    res.status(201).json({
        success: true,
        message: "task created successfully"
    });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}


export const getTasks = async(req, res) => {
    try {
        // const[projectId]= req.query;

        // if(!projectId){
        //     return res.status(400).json({
        //         success: false,
        //         message:"project ID required"
        //     })
        // }

        const tasks = await Task.find({
            // projectId,
            userId: req.user._id,
        }).sort({createdAt: -1});

        res.status(200).json({
            success: true,
            tasks,
        })
    } catch (error) {
        console.error("error fetching tasks", error);
        return res.status(500).json({
            success: false,
            message:"Server error"
        })
    }
}