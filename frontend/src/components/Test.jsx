import { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Timer from './Timer'
import TestProgressBar from './ProgressBar';
import '../styles/Test.css';


const Test = () => {
 
  const [questionAnswer, setQuestionAnswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  //Keep track of incorrect questions id's to pull out later from a db on a score/result component
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState(0); //Total # of questions answered corr + incorr
  const [skippedQuestions, setSkippedQuestions] = useState([]);//Skipped question + answer storage
  const [skipsCount, setSkipsCount] = useState(3);
  const [showSkippedQuestions, setShowSkippedQuestions] = useState(false);
  const [useSkipped, setUseSkipped] = useState(false);// controlling the q/a regular/skipped

  const [currentSkippedIndex, setCurrentSkippedIndex] = useState(0);

  // Timer code
  const [timerStarted, setTimerStarted] = useState(false); // Track if the timer has started
  const [timeElapsed, setTimeElapsed] = useState(0); // Track time elapsed for summary page
  const [buttonDisabled, setButtonDisabled] = useState(false); //Disable the btn when the test is started
  
  // Start test and reset timer
  const startTest = () => {
    setTimerStarted(true); // Start the timer
    setTimeElapsed(0);     // Reset the timer
    setButtonDisabled(true);//Disable "start test" button once clicked to prevent timer restart
  };

    //Update time elapsed every second
    useEffect(() => {
      if (timerStarted) {
        const interval = setInterval(() => {
          setTimeElapsed(prevTime => prevTime + 1);
        }, 1000);
    
        return () => clearInterval(interval);
      }
    }, [timerStarted]);

 
  //Total questions answered (correct + icorrect)
  const totalQuestionsAnswered = correctAnswers + incorrectAnswers.length;

   //Handling skips
  //Moved the "test finished" condition from handleSkippedQuestions to a useEffect 
  //and fetch the skipped questions once the test is over
  useEffect(() => {
    if (totalQuestionsAnswered >= 17 && skippedQuestions.length <= 3 && skipsCount < 3) {
      setShowSkippedQuestions(true);
      fetchSkippedQA();  
      setUseSkipped(true);     
    } else {
      fetchQuestions();
    }
  }, [skipsCount, skippedQuestions, totalQuestionsAnswered]);


  //Fetching questions from the server
  useEffect(() => {
    const totalQuestionsToAnswer = 20;
    const currentQuestionsAnswered = totalQuestionsAnswered - skippedQuestions.length;
    if (currentQuestionsAnswered < totalQuestionsToAnswer) {
      fetchQuestions();
    } else if (skippedQuestions.length > 0 && currentQuestionsAnswered < totalQuestionsToAnswer + skippedQuestions.length) {
      setQuestionAnswer(null);
      setAnsweredQuestions(0);
      setLoading(false);
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
      };

  //Fetching the skipped questions from a DB
  const fetchSkippedQA = async () => {
    try {
      // Fetch each skipped question one at a time
      for (let i = 0; i < skippedQuestions.length; i++) {
        // const questionId = skippedQuestions[i];
        const response = await axios.post("http://localhost:9000/test", { questionIds: [skippedQuestions[currentSkippedIndex]]  });
        if (!response.data) {
          throw new Error(`Fetching skipped QA with ID ${skippedQuestions[currentSkippedIndex]} from DB failed.`);
        }
        // Update skippedQuestions state with the fetched question
        setSkippedQuestions(prev => {
          const updatedQuestions = [...prev];
          updatedQuestions[currentSkippedIndex] = response.data;
          return updatedQuestions;
        });
      }
      setShowSkippedQuestions(true);
      setUseSkipped(true);
    } catch (error) {
      console.log("Error fetching skipped QA from DB:", error);
    }
  };

  //Next question for skips
  const handleNextQuestion = () => {
    if (currentSkippedIndex < skippedQuestions.length - 1) {
      setCurrentSkippedIndex(prevIndex => prevIndex + 1);
      fetchSkippedQA();
    }
  };
  
  //Prev question for skips
  const handlePreviousQuestion = () => {
    if (currentSkippedIndex > 0) {
      setCurrentSkippedIndex(prevIndex => prevIndex - 1);
      fetchSkippedQA();
    }
  };

  //Handling the user's answer selection (radio button)
  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value)
    console.log("event . target .value is answerId:", e.target.value);
  };


  //Handling user's answer submit
  const handleSubmit = () => {
    if (!timerStarted|| !selectedAnswer || !questionAnswer || !questionAnswer.answers) return; //Prevent submitting without a selected answer

    //Checking if the answer was chosen is correct
    const correctAnswer = questionAnswer.answers.find(answer => answer.is_correct)?.answer_id.toString();
    const correctSkippedAnswer = skippedQuestions.length > 0 ? skippedQuestions[0].answers.find(answer => answer.is_correct)?.answer_id.toString() : null;

    const selectedAnswerObject = questionAnswer.answers.find(answer => answer.answer_id.toString() === selectedAnswer);
    const selectedAnswerText = selectedAnswerObject ? selectedAnswerObject.answer_text : "User answer not found";

     //Find the answer object corresponding to the selectedAnswer ID
     const correctAnswerId = useSkipped ? correctSkippedAnswer : correctAnswer;

    if(selectedAnswer === correctAnswerId) {
      setResult("Correct answer!");
      setCorrectAnswers(prev => prev + 1)
    } else {
      setResult("Incorrect answer!");

      //Set incorrectly answered question by user: 
      //icorrQuestion + incorrAnswer + corrAnswer for test result: 
      setIncorrectAnswers(prev => [
        ...prev,  
        {
          question_id: questionAnswer.question_id,
          question_text: questionAnswer.question_text,
          user_answer: selectedAnswerText,
          correct_answer: questionAnswer.answers.find(answer => answer.is_correct).answer_text.toString()
        }
      ]);

      console.log("Incorrect answer IDs is:", [...incorrectAnswers, questionAnswer.question_id, incorrectAnswers]);
    }
    setAnsweredQuestions(prev => prev + 1);
    setSelectedAnswer(null); //Reset selection for the next question
      setResult(null);
  };

  //Handling skip question clicks
  const handleSkippedQuestion = () => {
    if (skipsCount <= 0 || !questionAnswer) return; //disable the button clicks
    setSkipsCount(prev => prev - 1);  //Decrement skips count
    //saves the id's of scipped questions to pull them out at the end of the test
    if(questionAnswer && questionAnswer.answers) {
    setSkippedQuestions(prev => [...prev, questionAnswer]);
    console.log('Skipped Questions Objects + AnswerIds from handleSkippedQuestions func are:', [...skippedQuestions, questionAnswer.question_id]);
    console.log("Answered question + skipsCount + questionAnswer", answeredQuestions, skipsCount, questionAnswer); 
    }   
  }; 

  //Determining test result
  const determineTestResult = () => {
  //const totalQuestionsAnswered = correctAnswers + incorrectAnswers.length;
  const incorrectAnswersCount = incorrectAnswers.filter(answer => answer.user_answer !== answer.correct_answer).length;
  const passed = correctAnswers >= 16 && totalQuestionsAnswered === 20 && incorrectAnswersCount <= 4;
  return passed ? "Passed!" : "Failed!";
};
  
  //In case no data is fetched from the DB
  if (loading) return <p>Loading...</p>;

  //test result
  if (correctAnswers + incorrectAnswers.length === 20) {
    const testResult = determineTestResult();


  //Test results section
    return (
      <div className='test-result'>
        
        <h3>Test Completed!</h3>

        <div className='test-score'>
          <h5>Number of Correct Answers: {correctAnswers} </h5>
          <h5>Number of Incorrect Answers: {incorrectAnswers.length}</h5>
        </div>
    
        {/* Determine the test result message */}
        {testResult === 'Passed!' ? (
          <div>
            <h4 className='test-result-display' style={{ color: 'green' }}>Test Result: {testResult}</h4>
          </div>
        ) : (
          <div>
            {/* <h4>Try better next time!</h4> */}
            <h4 className='test-result-display' style={{ color: 'red' }} >Test Result: {testResult}</h4>
          </div>
        )}
    
        {/* Display incorrectly answered questions */}
        <div className='incorrect-qa'>
          <h4>Questions answered incorrectly:</h4>
          {incorrectAnswers.map((incorrect, index) => (
            <div key={index} style={{ marginBottom: '50px' }}>
              {/* <p>Question ID: {incorrect.question_id}</p> */}
              <h5>Question: {incorrect.question_text}</h5>
              <h6>Your Answer: {incorrect.user_answer}</h6>
              <h6>Correct Answer: {incorrect.correct_answer}</h6>
            </div>
          ))}
          {/* Start the test over link */}
          <h5>Review: <a className="discovery-guide-link" href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada/read-online.html" target="_blank">  «Discover Canada Study Guide»</a></h5>
          <h5>Ready for another try? <a href="/test">«Start The Test Over»</a> </h5>
          </div>
      </div>
    );
  }



  //Rendering skipped questions section
   {/* skipped questions form below */}
  if (showSkippedQuestions && totalQuestionsAnswered >= 17 && skippedQuestions.length > 0 && skipsCount < 3) {
    return (
    <div className='skips-container'>
      {/* Progress Bar */}
      <div className='test-progress'><TestProgressBar currentQuestion={answeredQuestions + 1} totalQuestions={20} /></div>
      <div className='scips-content-container'>
        <h3 className='questions-count'>Skipped Question {currentSkippedIndex + 1}</h3>
        <h4 className='skips-question-text'>{skippedQuestions[currentSkippedIndex]?.question_text}</h4>
        <h4 className='answers'>Answers:</h4>
        <Form className='skips-answers-text'>
        {skippedQuestions[currentSkippedIndex]?.answers.map(answer => (
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
          <Button variant="outline-primary" className='skips-submit-answer-btn' onClick={handleSubmit}>Submit Answer</Button>
          <Button variant="outline-warning" className='prev-skip-btn' onClick={handlePreviousQuestion} disabled={currentSkippedIndex === 0}>Previous</Button>
          <Button variant="outline-warning" className='next-skip-btn' onClick={handleNextQuestion} disabled={currentSkippedIndex === skippedQuestions.length - 1}>Next</Button>
          <p className='skips-explain'>⁎ Click «Submit Answer» followed by «Next»</p>
          {/* Timer */}
          <div className='test-timer'><Timer timeInSeconds={30 * 60 - timeElapsed} /></div>
    </div>
    </div>
    );
  }

  //Rendering main page questions/answers section
  return (
    <div className='test-container'>
          {/* Progress Bar */}
          <div className='test-progress'><TestProgressBar currentQuestion={answeredQuestions + 1} totalQuestions={20} /></div>

        <div className='content-container'>
           <h3 className='questions-count'>Question {answeredQuestions + 1} of 20</h3>
           <h4 className='question-text'>{questionAnswer.question_text}</h4>
           <h4 className='answers'>Answers:</h4>
            <Form className='answers-text'>
             {questionAnswer.answers.map(answer => (
              <Form.Check
              key={answer.answer_id}
              type='radio'
              label={answer.answer_text}
              name="answerOption"
              id={`answer-${answer.answer_id}`}
              value={answer.answer_id}
              onChange={handleAnswerChange}
              className="custom-radio-button"
            />
           ))}
          </Form>
          <div>
          <Button variant="outline-primary" className='answer-submit-btn' onClick={handleSubmit}>Submit Answer</Button> 
          <Button variant="outline-warning" className='skip-question-btn' onClick={handleSkippedQuestion} disabled={skipsCount === 0}>Skip Question</Button>
          {result && <p>{result}</p>}
          </div>
          {/* Start test btn */}
          <Button variant='outline-primary' className='start-test-btn' onClick={startTest} disabled={buttonDisabled}>Start Test</Button>
          {/* Timer */}
          <div className='test-timer'><Timer timeInSeconds={30 * 60 - timeElapsed} /></div>
        </div>  
    </div>
  );
};

export default Test;