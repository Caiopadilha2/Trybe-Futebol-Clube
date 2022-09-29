import teamModel from '../database/models/Team';

const getAll = async () => {
  const teams = await teamModel.findAll();

  return teams;
};

const getById = async (id: string) => {
  const team = await teamModel.findByPk(id);
  return team;
};

export default { getAll, getById };
