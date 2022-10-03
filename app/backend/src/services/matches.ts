// const getAll = async () => {
//     const users = await Employee.findAll({
//       include: { model: Address, as: 'addresses' },
//     });

import matchModel from '../database/models/Match';
import teamModel from '../database/models/Team';

const getAll = async () => {
  const matches = await matchModel.findAll({
    include: [
      {
        model: teamModel,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      {
        model: teamModel,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      },
    ],
  });

  return matches;
};

const create = async (
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
) => {
  const allTeams = await matchModel.findAll();
  const haveHomeTeam = allTeams.filter((team) => team.id === homeTeam);
  const haveAwayTeam = allTeams.filter((team) => team.id === awayTeam);

  if (!haveHomeTeam.length || !haveAwayTeam.length) {
    return 'There is no team with such id!';
  }
  const match = await matchModel
    .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });

  return match;
};

const finishMatch = async (id: any) => {
  const match = await matchModel.findOne({ where: { id } });
  if (!match) return 'There is no match with such id';
  match.inProgress = false;
  match.save();
  // https://www.luiztools.com.br/post/tutorial-de-crud-com-node-js-sequelize-e-mysql/
  return 'finished';
};

const update = async (id: any, homeTeamGoals: any, awayTeamGoals: any) => {
  const match = await matchModel.findOne({ where: { id } });
  if (!match) return 'There is no match with such id';
  match.homeTeamGoals = homeTeamGoals;
  match.awayTeamGoals = awayTeamGoals;
  await match.save();
  return 'updated';
};

const getFinishedMatches = async () => {
  const finishedMatches = await matchModel.findAll({ where: { inProgress: false },
    include: [
      {
        model: teamModel,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      {
        model: teamModel,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      },
    ],
  });

  return finishedMatches;
};

export default { getAll, create, finishMatch, update, getFinishedMatches };
