const morgan = require('morgan');
const logger = require('./logger');

morgan.token('postData', function (req) {
  JSON.stringify(req.body);
});
const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :postData');

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  logger.logToFile(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed request' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
};