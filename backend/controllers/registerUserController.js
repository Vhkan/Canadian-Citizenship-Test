const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Users = require("../models/userModel");
const SECRET = "this_is_real_secret";
const userController = express.Router();

//Saving new user registration logic will be here 