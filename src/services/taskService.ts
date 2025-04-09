import { TaskRepository } from '../repositories/taskRepository';
import { Task } from '../types';

export class TaskService {
  // Instantiate TaskRepository
  private taskRepository = new TaskRepository();

  // creating new task
  async createTask(userId: number, title: string): Promise<Task> {
    // repo calling
    return this.taskRepository.createTask(userId, title);
  }

  // get tasks relatred to the user
  async getTasksByUserId(userId: number): Promise<Task[]> {
    return this.taskRepository.getTasksByUserId(userId);
  }

  // update task
  async updateTask(taskId: number, title: string): Promise<Task> {
    return this.taskRepository.updateTask(taskId, title);
  }

  // delete task
  async deleteTask(taskId: number): Promise<void> {
    return this.taskRepository.deleteTask(taskId);
  }

  //  toggle the completion status of a task
  async toggleTaskCompletion(taskId: number): Promise<Task> {
    return this.taskRepository.toggleTaskCompletion(taskId);
  }
}
