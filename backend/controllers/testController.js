// Question/Answer contoller
const express = require("express");
const Questions = require('../models/testModel');

const testController = express.Router();

testController.get("/test", async (req, res) => {
  try {
    const randomQuestion = await Questions.getRandomQuestion();
    if(!randomQuestion) {
      return res.status(404).json({error: "No question found!" })
    }
    //Sending the random question as a json
    res.json(randomQuestion); 
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = testController;