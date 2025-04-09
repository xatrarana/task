import { Request } from 'express';

export interface User {
    id: number;
    username: string;
    password: string; 
  }
  
  export interface Task {
    id: number;
    user_id: number;
    title: string;
  }


export interface AuthenticatedRequest extends Request {
  user?: Omit<User, 'password'>; 
}