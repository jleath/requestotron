const config = require('./util/config');
const middleware = require('./util/middleware');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./util/logger');
const requestRouter = require('./controllers/router');
const bodyParser = require('body-parser');
require('express-async-errors');

logger.info('Connecting to MongoDB');
console.log(config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connecting to MongoDB');
  })
  .catch(error => logger.error(error));

const app = express();
app.use(cors());
app.use(bodyParser.text({type: '*/*'}));
app.use(middleware.requestLogger);
app.use('/bin', requestRouter)
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
