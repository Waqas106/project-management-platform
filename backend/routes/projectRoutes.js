import express from 'express';
import { createProject, deleteProject, getProjects, updateProject } from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/create', protect, createProject);
router.get('/', protect, getProjects);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

export default router;