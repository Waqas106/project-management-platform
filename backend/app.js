import express from "express";
import cors from "cors";
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoute from './routes/taskRoute.js';

const app = express();
app.use(cors({
    origin: [
    "http://localhost:5173",
    "https://project-management-platform-mocha.vercel.app/"
  ],
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/project', projectRoutes);
app.use('/task', taskRoute);

export default app;