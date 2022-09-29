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

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const team = await teamService.getById(id);
    return res.status(200).json(team);
  } catch (error) {
    return next(error);
  }
};

export default { getAll, getById };
