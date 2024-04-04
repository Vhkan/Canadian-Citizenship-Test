// Question/Answer contoller
const express = require('express');
const validateToken = require('../middlewares/validateToken');
const Questions = require('../models/qaModel');

const qaController = express.Router();

qaController.get('/questions',(req, res) => {
  //Questions.getQuestionById[req.]
});

module.exports = qaController;