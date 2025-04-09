import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import { errorHandler } from './middlewares/errorHandler';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

dotenv.config();
const limiter = rateLimit({ // limiting the user request
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const app = express();


app.use(express.json());

// cors config
app.use(cors());
app.use(limiter)


// Set up routes
app.use('/api/auth', userRoutes);
app.use('/api/tasks', taskRoutes);

// Global error handler
app.use(errorHandler);

export default app;