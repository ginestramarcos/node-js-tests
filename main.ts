#!/usr/bin/env node

const app = require('./app');
const debug = require('debug')('node-js-tests:server');
import http from 'http';

const port = parseInt(process.env.PORT || '3000', 10);
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
server.on('listening', onListening);

function onListening() {
  console.log('Started listening on ' + server.address());
}
