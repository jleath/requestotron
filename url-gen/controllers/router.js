const requestRouter = require('express').Router();
const config = require('../util/config');
const crypto = require('crypto');
const { Pool } = require('pg');

const pool = new Pool({
    host: config.DB_HOST,
    user: config.DB_USERNAME,
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
        res.status(500).json(error);
    }
};

requestRouter.post('/', createBinHandler);

module.exports = requestRouter;
