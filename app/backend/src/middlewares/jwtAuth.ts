import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
import type { ILogin } from '../interfaces/login';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' }).end();
  }
  try {
    const pwt = `${__dirname}/../../jwt.evaluation.key`;
    const jwtKey = await fs.readFile(pwt, 'utf-8');

    const { user } = jwt.verify(token, jwtKey) as { user: ILogin };
    res.locals = user;
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' }).end();
  }
  next();
};
