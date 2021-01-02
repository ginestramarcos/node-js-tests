import express from 'express';

// eslint-disable-next-line require-jsdoc
export function templatizedHandler(
    req: express.Request, res: express.Response, next: express.NextFunction) {
  res.render('templatized', {
    name: req.query.name,
    bodyContents: 'Templatized body contents',
  });
}
