import { TaskRepository } from '../repositories/taskRepository';
import { Task } from '../types';

export class TaskService {
  private taskRepository = new TaskRepository();

  async createTask(userId: number, title: string): Promise<Task> {
    return this.taskRepository.createTask(userId, title);
  }

  async getTasksByUserId(userId: number): Promise<Task[]> {
    return this.taskRepository.getTasksByUserId(userId);
  }

  async updateTask(taskId: number, title: string): Promise<Task> {
    return this.taskRepository.updateTask(taskId, title);
  }

  async deleteTask(taskId: number): Promise<void> {
    return this.taskRepository.deleteTask(taskId);
  }
  async toggleTaskCompletion(taskId: number): Promise<Task> {
    return this.taskRepository.toggleTaskCompletion(taskId);
  }
}