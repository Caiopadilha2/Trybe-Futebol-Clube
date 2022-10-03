import { Request, Response, NextFunction } from 'express';
import leaderBoardService from '../services/leaderBoard';

const rankingHome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ranking = await leaderBoardService.rankingHome();
    return res.status(200).json(ranking);
  } catch (error) {
    return next(error);
  }
};

export default { rankingHome };
