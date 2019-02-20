import path from 'path';
import express from 'express';
import http from 'http';
import config from './config';

import ResourcesNegocio from './routes/resources-negocio.js';
import bodyParser from 'body-parser';

global.config = { appRoot: __dirname }


const app = express();

app.use(enableCors);


app.use( bodyParser.json({limit: '50mb'}) );
app.use( bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));


app.use('/api/push', ResourcesNegocio);


app.use(logErrors);
app.use(errorHandler);

app.listen(config.PORT, config.HOSTNAME, () => {
  console.log(`Server running on http://${config.HOSTNAME}:${config.PORT}/`);
});

function enableCors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
}

function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  var status = err.status || 500;
  res.status(status).send( err );
}
