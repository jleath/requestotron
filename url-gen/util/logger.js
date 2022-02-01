const config = require('./config');
const fs = require('fs');

const info = (...args) => {
  console.log(...args);
};

const error = (...args) => {
  console.error(...args);
};

const logToFile = text => {
  text = `${new Date()}: ${text}` + "\n";
  fs.appendFile(config.LOG_FILE_PATH, text, err => {
    if (err) {
      error(`Unable to write to log: ${text}`);
    }
  });
};

module.exports = {
  info, error, logToFile,
};