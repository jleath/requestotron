const requestRouter = require('express').Router();
const logger = require('../util/logger');
const config = require('../util/config');
const crypto = require('crypto');
const RequestPayload = require("../models/RequestPayload");
const { Pool } = require('pg');

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
        logger.info(`Created bin with url ${rows[0]}`);
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

const addRequest = async (req, res) => {
  let binId;
  try {
    binId = await getBinId(req.params.url);
    logger.info(`Added request to bin ${binId}`);
  } catch (err) {
    logger.error(err);
    res.status(400).send();
  }

  const payloadData = {
    binId,
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    url: req.url,
    method: req.method,
    headers: req.headers,
    body: Object.keys(req.body).length === 0 ? '' : req.body,
    time: req._startTime,
  };

  try {
    await new RequestPayload(payloadData).save();
    res.status(200).send();
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
};

requestRouter.post('/', createBinHandler);
requestRouter.get('/:url', getBinHandler);
requestRouter.all('/:url', addRequest);

module.exports = requestRouter;
