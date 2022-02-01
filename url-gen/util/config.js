require('dotenv').config();

const PORT = process.env.PORT;
const LOG_FILE_PATH = process.env.LOG_FILE_PATH;

module.exports = {
  PORT,
  LOG_FILE_PATH,
};