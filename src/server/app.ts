import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';

import {additionHandler} from './routes/addition';

export const port = parseInt(process.env.PORT || '3000', 10);

export const app = express();
app.set('port', port);

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const publicPath = path.join(__dirname, '../../dist/client');
const landingFile = path.join(publicPath, 'index.html');
app.use(express.static(publicPath));

const router: express.Router = new (express.Router as any)();
router.get('/addition', additionHandler);
app.use(router);

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: express.NextFunction) {
  res.sendFile(landingFile);
});

// error handler
app.use(function(
    err: any, req: express.Request, res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err + ' ' + err.stack);
  res.render('error');
});
