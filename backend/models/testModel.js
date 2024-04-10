const pool = require("../db/connection");

// Getting randomized question from  Questions + Answers DB tables
const getRandomQuestionAnswer = async () => {
  try {
    // const nativeQuery = 'SELECT * FROM Questions ORDER BY RANDOM() LIMIT 1';
    const nativeQuery = `SELECT 
    Questions.question_id, Questions.category_id, Questions.question_text, 
    Answers.answer_id, Answers.answer_text, Answers.is_correct
  FROM
    Questions JOIN Answers ON Answers.question_id = Questions.question_id
  WHERE
    Questions.question_id IN (
      SELECT question_id FROM Answers WHERE is_correct = true ORDER BY RANDOM() LIMIT 1
    )
  ORDER BY
    Questions.question_id, Answers.is_correct DESC, RANDOM();`;

    //Sending all 4 questions
    const response = await pool.query(nativeQuery);
    if (response.rows.length > 0) {
      //Keeping answers and questions separately

      const questionAnswerData = {
        question_id: response.rows[0].question_id,
        category_id: response.rows[0].category_id,
        question_text: response.rows[0].question_text,
        answers: response.rows.map((row) => ({
          answer_id: row.answer_id,
          answer_text: row.answer_text,
          is_correct: row.is_correct,
        })),
      };
      console.log("questionAnswerData is:", questionAnswerData);
      return questionAnswerData; //returning questions/answers
    } else {
      return null; //return null if no questions found
    }
  } catch (error) {
    console.error("Error fetching random question:", error);
    throw error;
  }
};

const Questions = {
  getRandomQuestionAnswer,
};

module.exports = Questions;
