import React, { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import CustomSlider from '../components/Slider'; // Assuming CustomSlider.js is in the same folder
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Feedback.css';

const Feedback = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([null, null, null]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const questions = [
    { id: 1, text: "I have ambitious aims of making a difference." },
    { id: 2, text: "My leadership journey has progressed as I anticipated." },
    { id: 3, text: "I have spent fewer than 4 years in full time service or ministry." }
  ];

  const handleSliderChange = (value) => {
    const newResponses = [...responses];
    newResponses[currentQuestion] = value;
    setResponses(newResponses);

    setIsTransitioning(true);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
      setIsTransitioning(false);
    }, 1000); // 1 second delay
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setIsTransitioning(true); // Set transitioning state
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setIsTransitioning(false); // Clear transitioning state after transition
      }, 300); // Adjust as needed to match CSS transition duration
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setIsTransitioning(true); // Set transitioning state
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setIsTransitioning(false); // Clear transitioning state after transition
      }, 300); // Adjust as needed to match CSS transition duration
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-title-container">
        <h1 className="feedback-title">ARE YOU DISILLUSIONED?</h1>
      </div>
      <div className="feedback-content">
        <div className="feedback-card">
          <ProgressBar currentQuestion={currentQuestion} totalQuestions={questions.length} />

          <div className="question-number">
            <span className="current-question-number">{questions[currentQuestion].id}</span>
            <span className="total-questions-number">/{questions.length}</span>
          </div>

          <TransitionGroup className="question-wrapper">
            <CSSTransition
              key={currentQuestion}
              timeout={300}
              classNames={isTransitioning ? 'slide-in' : 'slide-out'}
              unmountOnExit
            >
              <div className="question">{questions[currentQuestion].text}</div>
            </CSSTransition>
          </TransitionGroup>

          <CustomSlider value={responses[currentQuestion]} onChange={handleSliderChange} />

          <div className="navigation-buttons">
            <button className="nav-button" onClick={previousQuestion} disabled={currentQuestion === 0 || isTransitioning}>
              <span className="arrow-icon">&#8592;</span> Previous
            </button>
            <button className="nav-button" onClick={nextQuestion} disabled={currentQuestion === questions.length - 1 || isTransitioning}>
              Next <span className="arrow-icon right">&#8594;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
