require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const LOG_FILE_PATH = process.env.LOG_FILE_PATH;

module.exports = {
  PORT,
  LOG_FILE_PATH,
  MONGODB_URI,
};