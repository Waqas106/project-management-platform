import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createTask, getTasks, updateTaskStatus } from "../controllers/taskController.js";


const router = express.Router();

router.post("/create", protect, createTask);
router.get("/", protect, getTasks);
router.patch("/:id", updateTaskStatus);

export default router;