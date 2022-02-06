const requestRouter = require('express').Router();
const logger = require('../util/logger');
const config = require('../util/config');
const crypto = require('crypto');
const RequestPayload = require("../models/RequestPayload");
const { Pool } = require('pg');
const { request } = require('http');

const pool = new Pool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
});

const createBinHandler = async (req, res) => {
    const url = crypto.randomBytes(4).toString('hex');
    const args = [url];
    const query = `
    INSERT INTO bins (url)
    VALUES ($1)
    RETURNING url;`;
    try {
        const { rows } = await pool.query(query, args);
        logger.info(`Created bin with url ${url}`);
        res.status(201).json(rows[0]);
    } catch (err) {
        logger.error(err);
        res.status(500).json(err.message);
    }
};

const getBinId = async (url) => {
  const query = `SELECT id FROM bins WHERE url=$1;`;
  const { rows } = await pool.query(query, [url]);
  return parseInt(rows[0].id, 10);
};

const getBinHandler = async (req, res, next) => {
  if (req.query.inspect === undefined) {
    return next();
  }
  let binId;
  const url = req.params.url;
  try {
    binId = await getBinId(url);
    const payloads = await RequestPayload.find({ 'binId': binId});
    res.status(200).json(payloads);
  } catch (err) {
    logger.error(err);
    res.sendStatus(404);
  }
};

const addPayloadToBin = async (binId, req) => {
  const payloadData = {
    binId,
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    url: req.url,
    method: req.method,
    headers: req.headers,
    body: Object.keys(req.body).length === 0 ? '' : req.body,
    time: req._startTime,
  };

  const payload = await new RequestPayload(payloadData).save();
  return payload;
};

const addRequest = async (req, res) => {
  let binId;
  try {
    binId = await getBinId(req.params.url);
    logger.info(`Added request to bin ${binId}`);
  } catch (err) {
    logger.error(err);
    res.status(404).send();
    return
  }

  try {
    await addPayloadToBin(binId, req);
    res.status(200).send();
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
};

const getAllBinURLs = async () => {
  try {
   const {rows} = await pool.query('SELECT url FROM bins;');
   logger.info('All URLs retrieved: ', rows.length);
   return rows
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
}

requestRouter.post('/bin', createBinHandler);
requestRouter.get('/bin', getAllBinURLs)
requestRouter.get('/bin/:url', getBinHandler);
requestRouter.all('/bin/:url', addRequest);

module.exports = requestRouter;
