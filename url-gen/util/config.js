require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const LOG_FILE_PATH = process.env.LOG_FILE_PATH;
const DB_USER = process.env.DB_USER;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

module.exports = {
  PORT,
  LOG_FILE_PATH,
  MONGODB_URI,
  DB_USER,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
};
