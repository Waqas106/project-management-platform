import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required : true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            default: " ",
            trim: true
        },
        status: {
            type: String,
            enum: ["active", "completed"],
            default: "active"
        },
        dueDate: {
            type: Date
        },
        priority:{
            type: String,
            enum: ["low", "medium", "High"],
            default: "medium",
        },
    },
    {timestamps: true}
);

export default mongoose.model("Project", projectSchema);