import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        projectId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        title:{
            type: String,
            required: true,
            trim: true
        },
        description:{
            type: String,
            required: true,
            default: ""
        },
        status:{
            type: String,
            enum: ["todo", "in-progress", "completed"],
            default: "todo"
        },
        priority:{
            type: String,
            enum:["low", "medium", "high"],
            default: "medium"
        },
        dueDate:{
            type: Date,
            default: null
        },
},
{timestamps: true}
);

export default mongoose.model("Task", taskSchema);