const requestRouter = require('express').Router();
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
        res.status(201).json(rows[0]);
    } catch (err) {
        console.log('Im an error from createBinHandler!');
        console.log(err)
        res.status(500).json(err.message);
    }
};

const getBinId= async (url) => {
  const query = `SELECT id FROM bins WHERE url=$1;`;

  const { rows } = await pool.query(query, [url]);

  return parseInt(rows[0].id, 10);
}

const getBinHandler = async (req, res, next) => {
  if (req.query.inspect === undefined) {
    console.log("hello");
    return next();
  }
  let binId;
  const url = req.params.url;
  try {
    binId = await getBinId(url);
    res.status(200).json(binId);

  } catch (err) {
    console.log(err)
    res.sendStatus(404);
  }
}

const addRequest = async (req, res) => {
  let binId;
  try {
    binId = await getBinId(req.params.url);
  } catch (err) {
    console.log(err.message);
    res.status(400).send();
  }

  const headers = req.headers;
  const body = req.body;

  try {
    const answer = await new RequestPayload({ headers, body }).save();
    const query = "INSERT INTO requests (bin_id, payload_size_bytes, payload_id) VALUES ($1, $2, $3);";
    const data = [binId, req.body.length, answer.id];

    const insert = await pool.query(query, data);
    res.status(200).send();
  } catch (err) {
    console.log(err.message);
    res.status(400).send();
  }
};

requestRouter.post('/', createBinHandler);

requestRouter.get('/:url', getBinHandler);

requestRouter.all('/:url', addRequest);

module.exports = requestRouter;
