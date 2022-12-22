const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'AYqwG[!7tWYz#Di',
  database: 'knit_lms_test'
});

module.exports = pool;
