const createError = require('http-errors');
import express from 'express';
import cookieParser from 'cookie-parser';

import logger from 'morgan';
import * as nunjucks from 'nunjucks';
import * as path from 'path';

import {indexHandler} from './routes/index';
import {userHandler} from './routes/users';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

nunjucks.configure('views', {
  express: app,
  autoescape: true
});
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', express.Router().get('/', indexHandler));
app.use('/users', express.Router().get('/', userHandler));

// catch 404 and forward to error handler
app.use(function(req: any, res: any, next: any) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err + ' ' + err.stack);
  res.render('error');
});

module.exports = app;
