import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const TestProgressBar = ({ currentQuestion, totalQuestions }) => {
  const progress = ((currentQuestion - 1) / totalQuestions) * 100;

  return (
    <ProgressBar now={progress} label={`${progress.toFixed(0)}%`} />
  );
};

export default TestProgressBar;
