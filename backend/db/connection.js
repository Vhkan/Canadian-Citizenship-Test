const { Pool } = require('pg');

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

const db = new Pool(dbParams);

db.connect()
  .then(() => {
    console.log("The DB was connected successfully");
  })
  .catch((error) => {
    console.log("There is an error connecting to a DB:", error);
  });

module.exports = db;