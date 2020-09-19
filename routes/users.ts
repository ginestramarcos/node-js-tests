var express = require('express');
var router = express.Router();

export function userHandler(req: any, res: any, next: any) {
  res.send('respond with a resource');
};
