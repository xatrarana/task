import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import pool from '../config/db';

const userService = new UserService();

export class UserController {
  async register(req: Request, res: Response) {
    if (!req.body) {
      res.status(400).json({ error: 'Missing request body' });
      return;
    }
    const { username, password } = req.body;
    if (!username || typeof username !== 'string' || username.trim().length < 3) {
      res.status(400).json({ error: 'Invalid username. Must be at least 3 characters.' });
      return;
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      res.status(400).json({ error: 'Invalid password. Must be at least 6 characters.' });
      return;
    }

    try {
      const user = await userService.register(username, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'User  registration failed' });
    }
  }

  async login(req: Request, res: Response) {
    if (!req.body) {
      res.status(400).json({ error: 'Missing request body' });
      return;
    }
    const { username, password } = req.body;
    const result = await userService.login(username, password);
    if (result) {
      res.json({ user: result.user, token: result.token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  }
  async logout(req: Request, res: Response) {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
        res.sendStatus(204);
        return;
      }
  
      const token = authHeader.split(' ')[1];
      if (!token) {
        res.sendStatus(204);
        return;
      }
  
      const checkQuery = 'SELECT * FROM blacklisted_tokens WHERE token = $1';
      const result = await pool.query(checkQuery, [token]);
  
      if (result.rows.length > 0) {
        res.sendStatus(204);
        return;
      }
  
      const insertQuery = 'INSERT INTO blacklisted_tokens (token) VALUES ($1)';
      await pool.query(insertQuery, [token]);
  
      res.setHeader('Clear-Site-Data', '"cookies"');
      res.status(200).json({ message: 'You are logged out!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

}