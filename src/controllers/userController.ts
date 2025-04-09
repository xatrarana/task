import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import pool from '../config/db';

const userService = new UserService();

export class UserController {
  // Handles user registration with validation and calls the service to register
  async register(req: Request, res: Response) {
    if (!req.body) {
      res.status(400).json({ error: 'Missing request body' });
      return;
    }
    const { username, password } = req.body;
    // Validate username
    if (!username || typeof username !== 'string' || username.trim().length < 3) {
      res.status(400).json({ error: 'Invalid username. Must be at least 3 characters.' });
      return;
    }

    // Validate password
    if (!password || typeof password !== 'string' || password.length < 6) {
      res.status(400).json({ error: 'Invalid password. Must be at least 6 characters.' });
      return;
    }

    try {
      // Call the service to register the user
      const user = await userService.register(username, password);
      res.status(201).json(user); 
    } catch (error) {
      res.status(500).json({ error: 'User registration failed' });
    }
  }

  // Handles user login and provides a token if credentials are valid
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

  // Handles user logout and invalidates the session by blacklisting the token
  async logout(req: Request, res: Response) {
    try {
      // Retrieve the 'Authorization' header from the request
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
        res.sendStatus(204); // No content, as no token is provided
        return;
      }
  
      // Extract the token from the 'Authorization' header
      const token = authHeader.split(' ')[1]; // "Bearer <token>"
      if (!token) {
        res.sendStatus(204); 
        return;
      }
  
      // Check if the token is already blacklisted in the database
      const checkQuery = 'SELECT * FROM blacklisted_tokens WHERE token = $1';
      const result = await pool.query(checkQuery, [token]);
  
      if (result.rows.length > 0) {
        res.sendStatus(204); // No content, token is already blacklisted
        return;
      }
  
      // If token is not blacklisted, add it to the blacklist to invalidate it
      const insertQuery = 'INSERT INTO blacklisted_tokens (token) VALUES ($1)';
      await pool.query(insertQuery, [token]);
  
      res.status(200).json({ message: 'You are logged out!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
