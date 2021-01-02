import {app, port} from './app';
import http from 'http';

const server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);

// eslint-disable-next-line require-jsdoc
function onListening() {
  console.log('Started listening on ' + port);
}
