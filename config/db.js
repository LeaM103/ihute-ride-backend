const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ihute_ride",
  password: "Leah@",
  port: 5432,
});

module.exports = pool;