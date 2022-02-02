const requestRouter = require('express').Router();
const config = require('../util/config');
const { Pool } = require('pg');

const pool = new Pool({
    host: config.DB_HOST,
    user: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
});

const createBinHandler = async (req, res) => {
    const args = ["fhfh5"];
    const query = `
    INSERT INTO bins (url)
    VALUES ($1)
    RETURNING url;`;
    try {
        const { rows } = await pool.query(query, args);
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json(error);
    }
};

requestRouter.post('/', createBinHandler);

module.exports = requestRouter;
