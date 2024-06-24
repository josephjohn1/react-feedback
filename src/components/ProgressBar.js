import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
  const totalBars = 4;
  const progressPerQuestion = totalBars / totalQuestions;
  const currentProgress = (currentQuestion + 1) * progressPerQuestion;

  const calculateFill = (index) => {
    const fill = currentProgress - index;
    if (fill > 1) return 100;
    if (fill < 0) return 0;
    return fill * 100;
  };

  const getLabelColor = (index) => {
    const fill = currentProgress - index;
    const hasStartedFilling = fill > 0 && fill <= 1;
    // const isLastFullyFilled = Math.floor(currentProgress) === index;

    if (hasStartedFilling) {
      return 'blue';
    } else  {
      return 'black';
    }
  };

  return (
    <div className="progress-bars-container">
      {Array.from({ length: totalBars }, (_, index) => (
        <div key={index} className="progress-bar-wrapper">
          <div className="progress-bar-background">
            <div
              className="progress-bar"
              style={{ width: `${calculateFill(index)}%`, backgroundColor: 'blue' }}
            ></div>
          </div>
          <div
            className="progress-bar-label"
            style={{ color: getLabelColor(index) }}
          >
            {['IDEALISTIC', 'DISILLUSIONED', 'CYNICAL', 'HOPEFUL'][index]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
