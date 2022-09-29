import { NextFunction, Request, Response } from 'express';
import loginService from '../services/login';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await loginService.login(email, password);
    if (user === false) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    return res.status(200).json({ token: user });
  } catch (error) {
    return next(error);
  }
};

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    const valid = await loginService.validateLogin(authorization);
    if (!valid) return res.status(401).json({ message: 'Invalid token' });

    return res.status(200).json({ role: 'admin' });
  } catch (error) {
    return next(error);
  }
};

export default { login, validateLogin };
