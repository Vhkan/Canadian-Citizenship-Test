const bcrypt = require('bcrypt');
const pool = require('../db/connection');

const registerUser = (userData) => {
  const { username, password, email, first_name, last_name } = userData;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
    }

    const nativeQuery = `INSERT INTO Users (username, password, email, first_name, last_name) 
                         VALUES ($1, $2, $3, $4, $5);`;
    const values = [username, hashedPassword, email, first_name, last_name];

    pool.query(nativeQuery, values)
      .then(() => {
        console.log('User registered successfully');
      })
      .catch((error) => {
        console.log('Error saving user to DB:', error);
      });
  });
};

module.exports = { registerUser };
