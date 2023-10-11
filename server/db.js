const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'db4free.net',
  user: 'iamclutchx',
  password: 'Ue2mwAR@N8.4SrC',
  database: 'knit_lms'
});

module.exports = pool;