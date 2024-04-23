import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import '../styles/Timer.css';
import { useState, useEffect } from 'react';


const Timer = ({ timeInSeconds, isPlaying }) => {

const [timerSize, setTimerSize] = useState(300);
const [strokeWidth, setStrokeWidth] = useState(14);

  // Function to convert seconds to minutes and seconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

   // Handle resizing
   useEffect(() => {
    const resizeListener = () => {
      // Set size and stroke width based on the window width
      if (window.innerWidth < 1400) {
        setTimerSize(160);
        setStrokeWidth(6);
      } else {
        setTimerSize(300);
        setStrokeWidth(14);
      }
    };

    // Add event listener
    window.addEventListener('resize', resizeListener);

    // Call listener initially in case the initial window size is small
    resizeListener();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', resizeListener);
  }, []);


  return (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={timeInSeconds}
        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        size={timerSize}
        strokeWidth={strokeWidth}
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
