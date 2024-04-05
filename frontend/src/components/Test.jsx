import { useState, useEffect } from 'react';
import axios from 'axios';

const Test = () => {

  const [questionAnswer, setQuestionAnswer] = useState(null);
  const [loading, setLoading] = useState(true);

  //Fetching questions from the server
  useEffect(() => {
    axios.get("http://localhost:9000/test")
      .then(response => {
        if (!response.data) {
          throw new Error('Fetching data from DB failed.');
        }
        console.log('Data received:', response.data); //Loggin the received data
        setQuestionAnswer(response.data); //Setting the randomly selected question
        setLoading(false); //Setting loading to false when data is received
      })
      .catch(error => {
        console.error('Error fetching question:', error);
        setLoading(false); //Setting loading to false on error
      });
  }, []);
  
  
  if(loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
        <div>
           <h3>Question 1 of 20</h3>
           <p>{questionAnswer.question_text}</p>
           <h3>Answers:</h3>
           <ul>
           <p>{questionAnswer.answers.map(answer => (
            <li key={answer.answer_id}> {answer.answer_text}   </li>
           ))}</p>
           </ul>
           <button>Previous Question</button> <button> Next Question</button>
        </div>  
    </div>
  )
}

export default Test;