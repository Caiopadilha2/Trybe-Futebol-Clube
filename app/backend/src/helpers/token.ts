import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = 'vasco';
// https://stackoverflow.com/questions/65882838/how-to-solve-jsonwebtokenerror-invalid-signature-after-assigning-some-infos-to

const createToken = (id: number, role: string, username: string, email: string) => {
  const token = sign({ id, role, username, email }, JWT_SECRET, { algorithm: 'HS256' });
  return token;
};

const verifyToken = (token: string) => {
  try {
    const dados = verify(token, JWT_SECRET);
    return dados;
  } catch (error) {
    return null;
  }
};

export default { createToken, verifyToken };
