import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import '../styles/Timer.css';

const Timer = ({ timeInSeconds, isPlaying }) => {
  // Function to convert seconds to minutes and seconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={timeInSeconds}
        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        size={100}
        strokeWidth={5}
        onComplete={() => {
          // Handle completion
          console.log("Timer completed");
          return [false, 0];
        }}
      >
        {({ remainingTime }) => (
          <div className="timer">
            <div className="timer-text">Time Left:</div>
            <div className="timer-value">{formatTime(remainingTime)}</div> {/* Convert remaining time */}
          </div>
        )}
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;
