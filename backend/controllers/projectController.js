import Project from '../models/project.js';

export const createProject = async(req, res) => {
    try {
        const {title, description, dueDate, priority} = req.body;

        if(!title){
            return res.status(400).json({success: false, message:"Project title required"})
        }

        const project = await Project.create({
            title,
            description: description || " ",
            dueDate: dueDate || null,
            priority: priority || "medium",
            status: "active",
            userId: req.user._id
        });

        res.status(200).json({
            success: true,
            message: "Project created successfully",
            project
        });

    } catch (error) {
        console.error("Create project error", error);
        res.status(500).json({message: "Server error"});
    }
};


export const getProjects = async(req, res) => {
    try {
        const projects = await Project.find({userId: req.user._id}).sort({createdAt: -1});

        res.status(200).json({
            success: true,
            projects: projects
        });

    } catch (error) {
     console.error(error);
     res.status(500).json({success: false, message: "server error"});   
    }
}


export const updateProject = async(req, res) => {
    try {
        const{title, description, priority, dueDate} = req.body;

        const project = await Project.findOneAndUpdate(
        {
            _id: req.params.id,
            userId: req.user.id
        },
        {title, description, priority, dueDate},
        {new: true}
        );

        if(!project){
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        res.status(200).json({
            success: true,
            project
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Server  error"});
    }
}


export const deleteProject = async(req, res) => {
    try {
        const project = await Project.findByIdAndDelete({
            _id: req.params.id,
            userId: req.user._id
        })

        if(!project){
            return res.status(400).json({
                success: false,
                message: "project not found"
            })
        }

        res.status(200).json({
            success: true,
            message:"Project Deleted"
        });

    } catch (error) {
        console.error(error, "Server error");
    }
}