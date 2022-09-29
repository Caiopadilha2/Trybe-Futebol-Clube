import { NextFunction, Request, Response } from 'express';
import matchService from '../services/matches';

// const getAll = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const matches = await matchService.getAll();

//     return res.status(200).json(matches);
//   } catch (error) {
//     return next(error);
//   }
// };

const matchStatusQuery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const matches = await matchService.getAll();
    if (req.query.inProgress === 'true') {
      const andamento = matches.filter((match) => match.inProgress === true);
      return res.status(200).json(andamento);
    }
    if (req.query.inProgress === 'false') {
      const finalizada = matches.filter((match) => match.inProgress === false);
      return res.status(200).json(finalizada);
    }
    return res.status(200).json(matches);
  } catch (error) {
    return next(error);
  }
};

export default { matchStatusQuery };
