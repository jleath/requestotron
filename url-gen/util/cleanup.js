const logger = require('/home/wor101/requestotron/url-gen/util/logger.js');
const { Pool } = require('pg');
const { response } = require('express');
const RequestPayload = require("../models/RequestPayload");

const pool = new Pool({
  host: "localhost",
  user: "requestotron",
  password: "12345678",
  database: "requestotron"
});

const queryAllBins = async () => {
  const allBinsQuery = 'SELECT * FROM bins;';
  let allBins;

  try {
    const { rows } = await pool.query(allBinsQuery);
    logger.info('All bins queried for cleanup: ', rows.length );
    allBins = rows;
  } catch (err) {
    logger.error(err);
  }
  return allBins;
}

const sortBinsByTime = (allBins) => {
  allBins.sort((firstBin, secondBin) => {
    return firstBin.created - secondBin.created;
  })
  logger.info('Bins sorted by time: ', allBins.length)
  return allBins
}

const deleteBin = async (binId) => {
  const deleteQuery = 'DELETE FROM bins WHERE id=$1 RETURNING url;';
  try {
    const response = await pool.query(deleteQuery, [binId]);
    logger.info(`BinId ${binId} deleted from PostgreSQL`);
  } catch (err) {
    logger.error(err);
  }
  return response;
}

const deleteOldBins = async () => {
  const query = "DELETE FROM bins WHERE created < NOW() - INTERVAL '24 HOURS'";
  try {
    const response = await pool.query(query);
    logger.info('Old Bins deleted');
  } catch (err) {
    logger.error(err);
  }
}

deleteOldBins();
queryAllBins();
