const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const registerUser = require('../models/registerUserModel');
const SECRET = "this_is_real_secret";
const registerUserController = express.Router();

registerUserController.post('/register', async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;
  //calling the registerUser imported function with the re.body input
  try {
    await registerUser(username, firstName, lastName, email, password);
    //generating a token a signing a new user in
    const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });

    res.status(201).json({message: "Successfull registration!", token: token});

  } catch (error) {
    if(error.message === "User with such credentials already exists!") {
      return res.status(409).json({message: error.message});
    }
    console.error('Registration error:', error);
    res.status(500).json({ message: "An error occurred during registration." });
  }
});



module.exports = registerUserController;