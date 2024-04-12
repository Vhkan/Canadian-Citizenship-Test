import { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Test = () => {
  //Setttign q/a to [] to keep track of the q/a progress
  const [questionAnswer, setQuestionAnswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState(null);
  // const [remainingQuestions, setRemainingQuestions] = useState(20);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  //Keep track of incorrect questions id's to pull out later from a db on a score/result component
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);


  //Fetching questions from the server
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    if(answeredQuestions >= 20) {
      setLoading(false);
      alert("Test completed! Your score will be here soon!");
      return; //Stop fetching when 20 questions are answered
    }
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
  };


  //Handling the user's answer selection (radio button)
  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value)
  };


  //Handling user's answer submit
  const handleSubmit = () => {
    //Prevent submitting without a selected answer
    if (!selectedAnswer) return;

    //Checking if the answer was chosen is correct
    const correctAnswer = questionAnswer.answers.find(answer => answer.is_correct).answer_id.toString();
    console.log("Correct answer is:", correctAnswer);
    if(selectedAnswer === correctAnswer) {
      setResult("Correct answer!");
      setCorrectAnswers(prev => prev + 1)
      // fetchQuestions();
    } else {
      setResult("Incorrect answer!");
      setIncorrectAnswers(prev => [...prev, questionAnswer.question_id])
    }
    setAnsweredQuestions(prev => prev + 1);
    //Reset selection for the next question
    setSelectedAnswer(null);
    setTimeout(() => {
      setResult(null);
      fetchQuestions();
    }, 2000);
    //Decrease question count
  //  setRemainingQuestions(prevCount => prevCount - 1); 
  };
  
  //In case the no data is fetched from the DB
  if(loading) {
    return <p>Loading...</p>;
  }

  //For testing purposes: show the test score. Later will be resirect to a new (score/results) page
  if(answeredQuestions >= 20) {
      return (
        <div>
          <h1>Test Completed!</h1>
          <p> Correct Answers: {correctAnswers} </p>
          {/* will be the array of id's length */}
          <p> Incorrect Answers: {incorrectAnswers.length}</p> 
        </div>
      )
  }


  return (
    <div>
        <div>
           <h3>Question {answeredQuestions + 1} of 20</h3>
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
          <Button variant="outline-success" onClick={handleSubmit}>Submit Answer</Button> 
          <Button variant="outline-warning">Skip Question</Button>

          {/* make the result dissappear in 3 seconds in the future for better UI */}
          {result && <p>{result}</p>}
          </div>
        </div>  
    </div>
  );
};

export default Test;