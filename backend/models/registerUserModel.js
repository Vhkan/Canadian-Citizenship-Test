const bcrypt = require('bcrypt');
const pool = require('../db/connection');
const SECRET = "this_is_real_secret";

const registerUser = async (username, firstName, lastName, email, password) => {
  try {
    //Check if the user already exists
    const userExists = 'SELECT * FROM Users WHERE username = $1 OR email = $2;';
    const userExistsResult = await pool.query(userExists, [username, email]);
    if(userExistsResult.rows.length > 0){
      throw new Error("User with such credentials already exists!")
    } 

    //Hashing the new user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    //inserting the new user data into the DB
    const insertNewUser = 'INSERT INTO Users (username, password, email, first_name, last_name) VALUES ($1, $2, $3, $4, $5);';
    await pool.query(insertNewUser, [username, hashedPassword, email, firstName, lastName]);
    console.log("Successful user registration! User crefentials saved in DB.");
  } catch (err) {
    console.log("Error registering a user:", err);
  }
};



module.exports = registerUser;
