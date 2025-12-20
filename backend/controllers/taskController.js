import Task from "../models/task.js";

export const createTask = async(req, res) => {
    const{title, description, status, priority, dueDate} = req.body;


}