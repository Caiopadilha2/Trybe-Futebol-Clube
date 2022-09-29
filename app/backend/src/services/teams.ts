import teamModel from '../database/models/Team';

const getAll = async () => {
  const teams = await teamModel.findAll();

  return teams;
};

export default { getAll };
