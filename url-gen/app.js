const config = require('./util/config');
const middleware = require('./util/middleware');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./util/logger');
const requestRouter = require('./controllers/requests');
require('express-async-errors');
/*
logger.info('Connecting to MongoDB');
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connecting to MongoDB');
  })
  .catch(error => logger.error(error));
*/
const app = express();
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/', requestRouter)
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
