const pool = require("../db/connection");

// Getting randomized question from  Questions + Answers DB tables
const getRandomQuestionAnswer = async () => {
  try {
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

    //Sending all 4 questions + related answers
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
          is_correct: row.is_correct
        }))
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


//Fetching skipped quesions + answers from a DB by question_id,
const getSkippedQuestionAnswer = async (questionIds) => {
  try {
    console.log("QustIds are:", questionIds);
    const nativeQuery = `SELECT 
    Questions.question_id, Questions.category_id, Questions.question_text, 
    Answers.answer_id, Answers.answer_text, Answers.is_correct
  FROM
    Questions JOIN Answers ON Answers.question_id = Questions.question_id
  WHERE
   Questions.question_id = ANY($1)
   ORDER BY
   Questions.question_id, Answers.answer_id;`;

   //Questions.question_id = ANY(ARRAY[${questionIds.join(',')}])

    const response = await pool.query(nativeQuery, [questionIds]);
    if(response.rows.length > 0) {
      //iterating over response rows to accumulate the data into an {}
      //checking if the question_id already exists in the acc, if not => 
      //initialize new entry for a question + empty [] for answers
      const skippedQA = response.rows.reduce((acc, row) => {
        if(!acc[row.question_id]) {
          acc[row.question_id] = {
            question_id: row.question_id,
            question_text: row.question_text,
            category_id: row.category_id,
            answers: []
          };
        }
        acc[row.question_id].answers.push({
          answer_id: row.answer_id,
          answer_text: row.answer_text,
          is_correct: row.is_correct
        });
        return acc;
      }, {}); //acc parameter starts as an empty {}

      //Converting questionAnswer object to array of {}-s 
      //after groupping the skippedQA data
      return Object.values(skippedQA);
      
    } else {
      return []; //Return an empy array if nothing found
    }
  } catch (error) {
    console.error('Error fetching skippedQA from a DB', error);
    throw error;
  }
}; 


const Questions = {
  getRandomQuestionAnswer, 
  getSkippedQuestionAnswer
};

module.exports = Questions;