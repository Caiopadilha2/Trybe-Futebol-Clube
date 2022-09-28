import jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'vasco';

const createToken = (id: number, role: string, username: string, email: string) => {
  const token = jwt.sign({ id, role, username, email }, JWT_SECRET, { algorithm: 'HS256' });
  return token;
};

const verifyToken = (token: string) => {
  try {
    const dados = jwt.verify(token, JWT_SECRET);
    return dados;
  } catch (error) {
    return null;
  }
};

export default { createToken, verifyToken };
