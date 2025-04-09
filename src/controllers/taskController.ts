import { Request, Response } from 'express';
import { TaskService } from '../services/taskService';
import { AuthenticatedRequest, Task } from '../types';

const taskService = new TaskService();

export class TaskController {
    // Handles task creation. Checks if the user is authenticated, then creates the task.
    async createTask(req: AuthenticatedRequest, res: Response) {
        const { title } = req.body;
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'User not authenticated' });
            return;
        }
        try {
            // Call service to create task
            const task = await taskService.createTask(userId, title);
            res.status(201).json(task); // Return the created task
        } catch (error) {
            res.status(500).json({ error: 'Task creation failed' });
        }
    }

    // Fetches tasks for the authenticated user
    async getTasks(req: AuthenticatedRequest, res: Response) {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'User not authenticated' });
            return;
        }
        try {
            // Get tasks from service
            const tasks = await taskService.getTasksByUserId(userId!);
            res.json(tasks); // Send tasks as response
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve tasks' });
        }
    }

    // Updates a specific task with a new title
    async updateTask(req: Request, res: Response) {
        const { title } = req.body;
        const taskId = parseInt(req.params.id);
        try {
            // Call service to update task
            const updatedTask = await taskService.updateTask(taskId, title);
            res.json(updatedTask); // Return the updated task
        } catch (error) {
            res.status(500).json({ error: 'Task update failed' });
        }
    }
    
    // Deletes a specific task by ID
    async deleteTask(req: Request, res: Response) {
        const taskId = parseInt(req.params.id);
        try {
            // Call service to delete task
            await taskService.deleteTask(taskId);
            res.status(204).send(); // No content response
        } catch (error) {
            res.status(500).json({ error: 'Task deletion failed' });
        }
    }

    // Toggles the completion status of a task (completed/pending)
    async toggleTaskCompletion(req: Request, res: Response): Promise<void> {
        const taskId = parseInt(req.params.taskId);
        try {
            // Call service to toggle task completion status
            const toggledTask: Task = await taskService.toggleTaskCompletion(taskId);
            res.status(200).json(toggledTask); // Return the updated task
        } catch (error) {
            res.status(500).json({ error: "Failed to update task" });
        }
    }
}
