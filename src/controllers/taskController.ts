import { Request, Response } from 'express';
import { TaskService } from '../services/taskService';
import { AuthenticatedRequest, Task } from '../types';

const taskService = new TaskService();

export class TaskController {
    async createTask(req: AuthenticatedRequest, res: Response) {
        const { title } = req.body;
        const userId = req.user?.id
        if (!userId) {
             res.status(401).json({ error: 'User  not authenticated' });
             return;
        }
        try {
            const task = await taskService.createTask(userId, title);
            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ error: 'Task creation failed' });
        }
    }

    async getTasks(req: AuthenticatedRequest, res: Response) {
        const userId = req.user?.id;
        if (!userId) {
             res.status(401).json({ error: 'User  not authenticated' });
             return;
        }
        try {
            const tasks = await taskService.getTasksByUserId(userId!);
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve tasks' });
        }
    }

    async updateTask(req: Request, res: Response) {
        const { title } = req.body;
        const taskId = parseInt(req.params.id);
        try {
            const updatedTask = await taskService.updateTask(taskId, title);
            res.json(updatedTask);
        } catch (error) {
            res.status(500).json({ error: 'Task update failed' });
        }
    }

    async deleteTask(req: Request, res: Response) {
        const taskId = parseInt(req.params.id);
        try {
            await taskService.deleteTask(taskId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Task deletion failed' });
        }
    }

    async toggleTaskCompletion(req: Request, res: Response): Promise<void> {
        const taskId = parseInt(req.params.taskId);
        try {
          const toggledTask: Task = await taskService.toggleTaskCompletion(taskId);
          res.status(200).json(toggledTask);
        } catch (error) {
          res.status(500).json({ error: "Failed to update task" });
        }
      }
}