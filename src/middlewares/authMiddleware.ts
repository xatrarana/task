import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../types';

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
     res.status(401).json({ error: 'Missing or invalid header' });
     return;
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err || !decoded) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = {
      id: (decoded as any).id,
      username: (decoded as any).username,
    };

    next();
  });
};
