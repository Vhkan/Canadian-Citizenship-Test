const pool = require('../db/connection');

const getUser = (data) => {
  const nativeQuery = `SELECT * FROM Users WHERE email = $1;`;
  console.log("Executing query:", nativeQuery, "with parameters:", data);
  return pool.query(nativeQuery, data);
};


const Users = {
  getUser  
};

module.exports = Users;