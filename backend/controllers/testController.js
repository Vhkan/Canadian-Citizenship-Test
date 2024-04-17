// Question/Answer contoller
const express = require("express");
const Questions = require('../models/testModel');

const testController = express.Router();

testController.get("/test", async (req, res) => {
  try {
    const randomQuestion = await Questions.getRandomQuestionAnswer(); 
    if(!randomQuestion) {
      return res.status(404).json({error: "No question found!" })
    }
    //Sending the random question as a json
    res.json(randomQuestion); 
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Handling skipped question logic (sending an array of skips to the server)
testController.post("/test", async (req, res) => {
  //catching the skipped questoins ids
  const { questionIds } = req.body;
  if(!questionIds || questionIds.length === 0) {
    return res.status(400).json({message: 'No questionIds provided from the req.body'});
  }
  try {
    const skippedQuestions = await Questions.getSkippedQuestionAnswer(questionIds);
    if(skippedQuestions.length === 0) {
      return res.status(404).json({message: 'No skipped quesion found!'});
    }
    res.json(skippedQuestions);
  } catch (error) {
    res.status(500).json({error: "Internal server error."})
  }
});

module.exports = testController;