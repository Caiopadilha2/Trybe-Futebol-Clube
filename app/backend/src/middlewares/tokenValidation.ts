import { Request, Response, NextFunction } from 'express';
import tokenHelper from '../helpers/token';

const token = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const isValid = tokenHelper.verifyToken(authorization);

  if (!isValid) return res.status(401).json({ message: 'Token must be a valid token' });

  return next();
};

export default token;
