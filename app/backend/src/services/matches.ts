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

export default { getAll };
