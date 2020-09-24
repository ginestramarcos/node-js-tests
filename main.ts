import {app} from './app';
import http from 'http';

const port = parseInt(process.env.PORT || '3000', 10);
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);

// eslint-disable-next-line require-jsdoc
function onListening() {
  console.log('Started listening on ' + port);
}
