const config = require('./config');
const fs = require('fs');

const info = (...args) => {
  console.log(...args);
  logToFile(args);
};

const error = (...args) => {
  console.error(...args);
  logToFile(args);
};

const logToFile = (args) => {
  args.forEach(arg => {
    const text = `${new Date()}: ${arg}` + "\n";
    fs.appendFile(config.LOG_FILE_PATH, text, err => {
      if (err) {
        error(`Unable to write to log: ${text}`);
      }
    });
  });
};

module.exports = {
  info, error, logToFile,
};