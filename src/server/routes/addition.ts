import express from 'express';

enum Operation {
  Add = 'add',
  Subtract = 'subtract',
}

interface QueryInput {
  a: string;
  b: string;
  op: Operation;
}

// eslint-disable-next-line require-jsdoc
export function additionHandler(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    req: express.Request, res: express.Response, next: express.NextFunction) {
  const input: QueryInput = req.query as any;
  const a = parseInt(input.a);
  const b = parseInt(input.b);
  let result = null;
  if (input.op === Operation.Add) {
    result = a + b;
  } else if (input.op === Operation.Subtract) {
    result = a - b;
  } else {
    throw new Error('unknown op: ' + input.op);
  }
  res.json({result});
};
