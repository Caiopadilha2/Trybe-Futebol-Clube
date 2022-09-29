import { NextFunction, Request, Response } from 'express';
import matchService from '../services/matches';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const matches = await matchService.getAll();
    return res.status(200).json(matches);
  } catch (error) {
    return next(error);
  }
};

export default { getAll };
