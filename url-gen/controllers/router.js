const requestRouter = require('express').Router();
const config = require('../util/config');
const crypto = require('crypto');
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
    next();
  }
  let binId;
  const url = req.params.url;
  try {
    binId = await getBinId(url);
    console.log("Bin Id:", binId)
    res.status(200).json(binId);

  } catch (err) {
    console.log(err)
    res.sendStatus(404);
  }

}

requestRouter.post('/', createBinHandler);

requestRouter.get('/:url',getBinHandler );

module.exports = requestRouter;
