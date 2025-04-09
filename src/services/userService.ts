import { UserRepository } from '../repositories/userRepository';
import { User } from '../types';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

interface LoginResponse {
  user: Omit<User, 'password'>; // safe user without the password field
  token: string;
}

export class UserService {
  private userRepository = new UserRepository();

  //  register a new user
  async register(username: string, password: string): Promise<Omit<User, 'password'>> {
    // user Repository
    const user = await this.userRepository.createUser(username, password);

    // safce user without password field (for security)
    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  // log in of the user
  async login(username: string, password: string): Promise<LoginResponse | null> {
    // check fi the user exits 
    const user = await this.userRepository.findUserByUsername(username);

    // password hash comparision
    if (user && await bcrypt.compare(password, user.password)) {
      // generating the token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

      const { password: _, ...safeUser } = user;

      return { user: safeUser, token };
    }

    // If authentication fails, return null
    return null;
  }
}
