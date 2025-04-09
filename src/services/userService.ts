import { UserRepository } from '../repositories/userRepository';
import { User } from '../types';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'


interface LoginResponse {
  user: Omit<User,'password'>;
  token: string;
}

export class UserService {
  private userRepository = new UserRepository();

  async register(username: string, password: string): Promise<Omit<User,'password'>> {
    const user = await this.userRepository.createUser(username, password);
    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  async login(username: string, password: string): Promise<LoginResponse | null> {
    const user = await this.userRepository.findUserByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  
      const { password: _, ...safeUser } = user;
  
      return { user: safeUser, token };
    }
    return null;
  }
  
}