import { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";



const Test = () => {
  //Setttign q/a to [] to keep track of the q/a progress
  const [questionAnswer, setQuestionAnswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  //Keep track of incorrect questions id's to pull out later from a db on a score/result component
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState(0); //Total # of questions answered corr + incorr
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  const [skipsCount, setSkipsCount] = useState(3);
  const [showSkippedQuestions, setShowSkippedQuestions] = useState(false);
  
  const navigate = useNavigate();


  //Fetching questions from the server
  useEffect(() => {
    const totalQuestionsToAnswer = 20;
    const questionsAnsweredOrSkipped = answeredQuestions + skippedQuestions.length;
    if (questionsAnsweredOrSkipped < totalQuestionsToAnswer) {
      fetchQuestions();
    } else if (skippedQuestions.length > 0 && questionsAnsweredOrSkipped < totalQuestionsToAnswer + skippedQuestions.length) {
      fetchSkippedQA();
    }
  }, [answeredQuestions, skippedQuestions]);


  const fetchQuestions = () => {
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
      }

  //Fetching the skipped questions from a DB
  const fetchSkippedQA = () => {
    //logi how to regulate the total number of test questions inclding skipped to have 20

    axios.post("http://localhost:9000/test", { questionIds: skippedQuestions })
    .then(response => {
      if(!response.data) {
        throw new Error('Fetching skipped QA from DB failed.');
      } 
      // Handling fetched skipped questions by setting to skippedQuestions
      setSkippedQuestions(response.data);
      console.log("skippedQA data from fetchSkippedQA is (response.data):", response.data);
    })
    .catch(error => {
      console.log("Error fetching skipped QA from DB is:", error);
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
    console.log("Correct answer ID is:", correctAnswer);
    if(selectedAnswer === correctAnswer) {
      setResult("Correct answer!");
      setCorrectAnswers(prev => prev + 1)
    } else {
      setResult("Incorrect answer!");
      setIncorrectAnswers(prev => [...prev, questionAnswer.question_id])

      //Set incorrectly answered question by user: icorrQuestion + incorrAnswer + corrAnswer to say later in the test result: 
      //Correct Answer is: correct answer 

      console.log("Incorrect answer ID is:", incorrectAnswers);
    }
    setAnsweredQuestions(prev => prev + 1);
    //Reset selection for the next question
    setSelectedAnswer(null);
    setTimeout(() => {
      setResult(null);
      fetchQuestions();
    }, 0);
  };

    //Handling skip question clicks
    const handleSkippedQuestion = () => {
    //disable the button clicks
     if (skipsCount <= 0 || !questionAnswer) return;
      //saves the id's of scipped questions to pull them out at the end of the test
      setSkippedQuestions(prev => [...prev, questionAnswer.question_id]);
      console.log('Skipped Questions ids are:', [...skippedQuestions, questionAnswer.question_id]);
      //Decrement skips count
      setSkipsCount(prev => prev - 1);
      // fetchSkippedQA(); //Fetch skipped questions immediately after skipping
      fetchQuestions(); //Fetch the next question
    };
 

    // Determining test result
    const determineTestResult = () => {
      const totalQuestionsAnswered = correctAnswers + incorrectAnswers.length;
      const passed = correctAnswers >= 16 && totalQuestionsAnswered === 20 && incorrectAnswers.length <= 4;
      return passed ? "Passed!" : "Failed!";
    };
    
  
  //In case the no data is fetched from the DB
    if (loading) return <p>Loading...</p>;

  //For testing purposes: show the test score. Later will be resirect to a new (score/results) page
  if (correctAnswers + incorrectAnswers.length === 20) {
    const testResult = determineTestResult();
  
      return (
        <div>
          <h1>Test Completed!</h1>
          <p> Number of Correct Answers: {correctAnswers} </p>

          {/* pass/no pass */}
          {/* IF NO PASS => SHOW LINK TO STUDY GUIDE || PASS => CONGRATULATIONS + TEST SCORE */}
          <p>Test Result: {testResult}</p>

          {/* skipped questions id are shown */}
          <p>Skipped Questions: {skippedQuestions.map(q => `${q.question_id}: ${q.question_text}`).join(', ')}</p>

          <p>Questions answered incorrectly: WILL BE HERE + INCORRECT ANSWERS TO THEM</p>

          {/* will be the array of id's length */}
          <p> Number of Incorrect Answers: {incorrectAnswers.length}</p> 
          <p>Incorrect Answers: {incorrectAnswers.map(id => `Qid: ${id}`).join(', ')}</p>
          
          {/* A link to Learning Material will be here */}
          <h4>Review the Discover Canada Study Guide</h4>
          <p>Discover Canada: Read online: <a href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada/read-online.html" target="_blank">Study Guide – Discover Canada</a></p>
          
          {/* <Button onClick={() => navigate("/test")}>Start Over</Button> */}
          <a href="/test"><b>Start The Test Over</b></a>
        </div>
      )
  }

  //Rendering skipped questions if any
  if(showSkippedQuestions && skippedQuestions.length > 0) {
    return (
      <div>
        <h3>Skipped Questions:</h3>
        {skippedQuestions.map((question, index) => (
          <div key={index}>
          <h3>Question {index + 1}</h3>
          <p>{question.question_text}</p>
          <Form>
           {question.answers && question.answers.map(answer => (
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
          </div>
        ))}
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
          <Button variant="outline-warning" onClick={handleSkippedQuestion} disabled={skipsCount === 0}>Skip Question</Button>
          {result && <p>{result}</p>}
          </div>
        </div>  
    </div>
  );
};

export default Test;