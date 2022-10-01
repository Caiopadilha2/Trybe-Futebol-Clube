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
    const { inProgress } = req.query;
    if (inProgress === 'true') {
      const andamento = matches.filter((match) => match.inProgress === true);
      return res.status(200).json(andamento);
    }
    if (inProgress === 'false') {
      const finalizada = matches.filter((match) => match.inProgress === false);
      return res.status(200).json(finalizada);
    }
    return res.status(200).json(matches);
  } catch (error) {
    return next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const match = await matchService.create(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);

    if (match === 'There is no team with such id!') {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    return res.status(201).json(match);
  } catch (error) {
    return next(error);
  }
};

const finishMatch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const match = await matchService.finishMatch(id);
    if (!match) return 'There is no match with such id';
    return res.status(200).json({ message: 'Finished' });
  } catch (error) {
    return next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const match = await matchService.update(id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: match });
  } catch (error) {
    return next(error);
  }
};

export default { matchStatusQuery, create, finishMatch, update };
