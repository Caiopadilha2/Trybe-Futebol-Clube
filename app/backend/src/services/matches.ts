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

export default { getAll, create, finishMatch };
