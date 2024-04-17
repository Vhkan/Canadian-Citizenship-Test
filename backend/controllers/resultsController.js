const express = require("express");

const resultsController = express.Router();

resultsController.get('/results', (req, res) => {
  console.log("resultsController works as expected");
});

module.exports = resultsController;