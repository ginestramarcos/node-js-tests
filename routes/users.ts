import {Request, Response, NextFunction} from 'express';

// eslint-disable-next-line require-jsdoc
export function userHandler(
    req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
};
