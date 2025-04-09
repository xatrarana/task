import pool from '../config/db';
import { Task } from '../types';

export class TaskRepository {
  async createTask(userId: number, title: string): Promise<Task> {
    const result = await pool.query('INSERT INTO tasks (user_id, title) VALUES ($1, $2) RETURNING *', [userId, title]);
    return result.rows[0];
  }

  async getTasksByUserId(userId: number): Promise<Task[]> {
    const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
    return result.rows;
  }

  async updateTask(taskId: number, title: string): Promise<Task> {
    const result = await pool.query('UPDATE tasks SET title = $1 WHERE id = $2 RETURNING *', [title, taskId]);
    return result.rows[0];
  }

  async deleteTask(taskId: number): Promise<void> {
    await pool.query('DELETE FROM tasks WHERE id = $1', [taskId]);
  }
  async toggleTaskCompletion(taskId: number): Promise<Task> {
    const currentTaskResult = await pool.query('SELECT status FROM tasks WHERE id = $1', [taskId]);
    
    if (currentTaskResult.rows.length === 0) {
      throw new Error('Task not found');
    }

    const currentStatus = currentTaskResult.rows[0].status;

    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';

    const result = await pool.query('UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *', [newStatus, taskId]);
    return result.rows[0];
  }
}