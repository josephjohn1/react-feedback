import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
  const totalBars = 4;
  const progressPerQuestion = totalBars / totalQuestions; // progress per question
  const currentProgress = (currentQuestion + 1) * progressPerQuestion; // current progress in bars

  const calculateFill = (index) => {
    const fill = currentProgress - index;
    if (fill > 1) return 100;
    if (fill < 0) return 0;
    return fill * 100; // return fill percentage
  };

  const getColor = (index) => {
    const fill = currentProgress - index;
    return fill > 0 ? 'blue' : 'grey';
  };

  const isLabelBlue = (index) => {
    if (index === totalBars - 1 && currentQuestion === totalQuestions - 1) {
      return true;
    }
    const fill = currentProgress - index;
    return fill > 0 && fill < 1;
  };

  return (
    <div className="progress-bars-container">
      {Array.from({ length: totalBars }, (_, index) => (
        <div key={index} className="progress-bar-wrapper">
          <div className="progress-bar-background">
            <div
              className="progress-bar"
              style={{ width: `${calculateFill(index)}%`, backgroundColor: getColor(index) }}
            ></div>
          </div>
          <div
            className="progress-bar-label"
            style={{ color: isLabelBlue(index) ? 'blue' : 'black' }}
          >
            {['IDEALISTIC', 'DISILLUSIONED', 'CYNICAL', 'HOPEFUL'][index]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
