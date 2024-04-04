const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Users = require("../models/userModel");
const SECRET = "this_is_real_secret";
const validateToken = require('../middlewares/validateToken');
const userController = express.Router();

userController.post("/login", (req, res) => {
  const { email, password } = req.body;

  Users.getUser([email])
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "User not found!" });
      }
      // return res.json(result.rows[0]);
      bcrypt.compare(password, result.rows[0].password)
      .then((bcryptResult) => {
        if (!bcryptResult) {
          return res.status(400).json({ message: "Invalid credentials!" });
        }

        //Storing token information
        const payload = {
          id: result.rows[0].user_id,
          email: result.rows[0].email,
          first_name: result.rows[0].first_name,
          last_name: result.rows[0].last_name
        }
        jwt.sign(payload, SECRET, {expiresIn: "60m"}, (err, token) => {
          if(err) {
            return res.status(400).json({message: "Error generating a token!"});
          }
          return res.json({token: token});
        });

      });
    })
    .catch((error) => {
      console.error("Error when trying to fetch user from DB:", error);
      return res
        .status(500)
        .json({ message: "Error when trying to fetch user" });
    });
});

//Enpoint for token validation
userController.get("/verify", validateToken, (req, res) => {
  return res.json(req.userInfo);
}); 



module.exports = userController;
