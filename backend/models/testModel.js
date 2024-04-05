const pool = require('../db/connection');

// Getting randomized question from DB table 
const getRandomQuestion = async () => {
  try {
    const nativeQuery = 'SELECT * FROM Questions ORDER BY RANDOM() LIMIT 1';
    const response = await pool.query(nativeQuery);
    if (response.rows.length > 0) {
      return response.rows[0]; //Extract the first row (random question)
    } else {
      return null; //return null if no questions found
    }
  } catch (error) {
    console.error('Error fetching random question:', error);
    throw error;
  }
};

const Questions = {
  getRandomQuestion
};

module.exports = Questions;
