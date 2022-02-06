const config = require('./config');
const fs = require('fs');
const logFilePath = '/home/wor101/requestotron/url-gen/util/url-gen.log';

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
    fs.appendFile(logFilePath, text, err => {
      if (err) {
        error(`Unable to write to log: ${text}`);
      }
    });
  });
};

module.exports = {
  info, error, logToFile,
};
