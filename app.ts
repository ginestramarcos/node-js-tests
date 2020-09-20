import express from 'express';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';

import logger from 'morgan';
import * as nunjucks from 'nunjucks';
import * as path from 'path';

import {indexHandler} from './routes/index';
import {userHandler} from './routes/users';

export const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

nunjucks.configure('views', {
  express: app,
  autoescape: true,
});
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const router: express.Router = new (express.Router as any)();
app.use('/', router.get('/', indexHandler));
app.use('/users', router.get('/users', userHandler));

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response,
    next: express.NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(
    err: any, req: express.Request, res: express.Response,
    next: express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err + ' ' + err.stack);
  res.render('error');
});
