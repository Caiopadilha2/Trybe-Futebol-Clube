import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/User';
import tokenHelper from '../helpers/token';

const login = async (email: string, password: string) => {
  const user = await UserModel.findOne({ where: { email } });
  if (!user) {
    return false;
  }
  const userIsValid = await bcrypt.compare(password, user.password);
  if (!userIsValid) {
    return false;
  }
  const userToken = tokenHelper.createToken(user.id, user.role, user.username, user.email);

  return userToken;
};

const validateLogin = async (token: any) => {
  const result = tokenHelper.verifyToken(token);
  return result;
};

export default { login, validateLogin };
