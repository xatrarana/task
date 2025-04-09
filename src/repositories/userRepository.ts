import pool from '../config/db';
import { User } from '../types';
import bcrypt from 'bcryptjs'

export class UserRepository {
  async createUser (username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
    return result.rows[0];
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0] || null;
  }
}