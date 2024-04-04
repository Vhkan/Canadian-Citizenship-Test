const pool = require('../db/connection');

const getQuestionById = (questionId) => {
  const nativeQuery = `SELECT question_id, question_text FROM Questions WHERE question_id = $1;`;
  return pool.query(nativeQuery, [questionId]);
};

const Questions = {
  getQuestionById
};

module.exports = Questions;