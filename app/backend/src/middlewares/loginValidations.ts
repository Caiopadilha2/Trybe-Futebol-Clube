// login fildes ("message": "All fields must be filled" }, statu 400)
// login invalid fields ( { "message": "Incorrect email or password" }, status 401);

import { NextFunction, Request, Response } from 'express';

const loginFildes = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  return next();
};

// const loginInvalidFields = (req: Request, res: Response, next: NextFunction) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'All fields must be filled' });
//   }
//   return next();
// };

export default loginFildes;
