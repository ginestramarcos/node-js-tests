import express from 'express';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import logger from 'morgan';
import nunjucks from 'nunjucks';
import path from 'path';

import {templatizedHandler} from './routes/templatized';
import {additionHandler} from './routes/addition';

export const port = parseInt(process.env.PORT || '3000', 10);

export const app = express();
app.set('port', port);

nunjucks.configure(__dirname + '/views', {
  express: app,
  autoescape: true,
});
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const publicPath = path.join(__dirname, '../../dist/client');
app.use(express.static(publicPath));

const router: express.Router = new (express.Router as any)();
router.get('/templatized', templatizedHandler);
router.get('/addition', additionHandler);
app.use(router);

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
