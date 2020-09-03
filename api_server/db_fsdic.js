// ENV
require('dotenv').config();

// DEPENDENCIES
var pool = require('pg').Pool;
pool = new pool({
    user: process.env.DB_USER,
    host: process.env.POSTGRESQL_DB_HOST,
    database: process.env.COL_AVIATION,
    password: process.env.DB_PASS,
    port: process.env.POSTGRESQL_DB_PORT,
    connectionLimit: 20,
    waitForConnections: false
});

module.exports = pool;