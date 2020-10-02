import express from 'express';

// eslint-disable-next-line require-jsdoc
export function indexHandler(
    req: express.Request, res: express.Response, next: express.NextFunction) {
  res.render('index', {
    name: req.query.name,
    bodyContents: 'Templatized body contents',
  });
  console.log(req.query);
}
