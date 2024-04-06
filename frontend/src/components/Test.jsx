import { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Test = () => {

  const [questionAnswer, setQuestionAnswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState(null);
 

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


  //Handling the user's answer selection (radio button)
  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value)
  };

  //Handling user's answer submit
  const handleSubmit = () => {
    //Checking if the answer was chosen is correct
    const correctAnswer = questionAnswer.answers.find(answer => answer.is_correct).answer_id.toString();
    console.log("Correct answer is:", correctAnswer);
    if(selectedAnswer === correctAnswer) {
      setResult("Correct answer!");
    } else {
      setResult("Incorrect answer!");
    }
  };
  
  //In case the no data is fetched from the DB
  if(loading) {
    return <p>Loading...</p>;
  }


  return (
    <div>
        <div>
           <h3>Question 1 of 20</h3>
           <p>{questionAnswer.question_text}</p>
           <h3>Answers:</h3>

          <Form>
           {questionAnswer.answers.map(answer => (
            <Form.Check 
              key={answer.answer_id}
              type='radio'
              label={answer.answer_text}
              name="answerOption"
              id={`answer-${answer.answer_id}`}
              value={answer.answer_id}
              onChange={handleAnswerChange}
            />
           ))}
          </Form>
          <div>
           <button>Previous Question</button> <button> Next Question</button>
          </div>
          <Button variant="outline-success" onClick={handleSubmit}>Submit Answer</Button>{result && <p>{result}</p>}
        </div>  
    </div>
  );
};

export default Test;