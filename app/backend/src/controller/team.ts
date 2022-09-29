import { NextFunction, Request, Response } from 'express';
import teamService from '../services/teams';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teams = await teamService.getAll();
    return res.status(200).json(teams);
  } catch (error) {
    return next(error);
  }
};

export default { getAll };
