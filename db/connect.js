const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "toor",
  database: "employee",
});

module.exports = { pool };
