import express from 'express';

interface QueryInput {
  a: string;
  b: string;
}

// eslint-disable-next-line require-jsdoc
export function additionHandler(
    req: express.Request, res: express.Response, next: express.NextFunction) {
  const input: QueryInput = req.query as any;
  res.json({'result': (parseInt(input.a) + parseInt(input.b))});
};
