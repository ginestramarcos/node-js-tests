import express from 'express';

// eslint-disable-next-line require-jsdoc
export function userHandler(
    req: express.Request, res: express.Response, next: express.NextFunction) {
  res.send('respond with a resource');
};
