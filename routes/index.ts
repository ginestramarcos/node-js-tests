import {Request, Response, NextFunction} from 'express';

// eslint-disable-next-line require-jsdoc
export function indexHandler(
    req: Request, res: Response, next: NextFunction) {
  res.render('index', {bodyContents: 'Templatized body contents'});
};
