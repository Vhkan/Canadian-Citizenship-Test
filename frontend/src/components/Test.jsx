import { useState, useEffect } from 'react';
import axios from 'axios';

const Test = () => {

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  //Fetching questions from the server
  useEffect(() => {
    axios.get("http://localhost:9000/test")
      .then(response => {
        if (!response.data) {
          throw new Error('Fetching data from DB failed.');
        }
        console.log('Data received:', response.data); //Loggin the received data
        setQuestion(response.data); //Setting the randomly selected question
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
           <h3>Question:</h3>
           <p>{question.question_text}</p>
        </div>  
    </div>
  )
}

export default Test;