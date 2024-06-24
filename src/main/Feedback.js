import React, { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import CustomSlider from '../components/Slider';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Feedback.css';

const Feedback = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState(Array(20).fill(null));
  const [isTransitioning, setIsTransitioning] = useState(false);

  const questions = [
    { id: 1, text: "I have ambitious aims of making a difference." },
    { id: 2, text: "My leadership journey has progressed as I anticipated." },
    { id: 3, text: "I have spent fewer than 4 years in full time service or ministry." },
    { id: 4, text: "With hard work and determination, I have been able to persevere through the ministry challenges that have come my way." },
    { id: 5, text: "My plans are likely to succeed." },
    { id: 6, text: "I’m beginning to believe the journey of service will be much harder than I anticipated." },
    { id: 7, text: "I question whether I can remain effective in my role long-term." },
    { id: 8, text: "I wonder if I’m really making the difference I anticipated making." },
    { id: 9, text: "It feels as though I have hit a wall in my ministry, and I’m not sure where to go from here." },
    { id: 10, text: "In this season of ministry, I’m feeling the disappointment of unmet expectations." },
    { id: 11, text: "If I had the option of changing careers, I would." },
    { id: 12, text: "The problems we’re confronting are just too big to make a meaningful difference." },
    { id: 13, text: "The passion I once had for the ministry I serve has been depleted." },
    { id: 14, text: "As a leader, it is my job to bring about outcomes at my organization." },
    { id: 15, text: "I have a generally pessimistic outlook toward the future of my ministry." },
    { id: 16, text: "It is my job to be faithful; it is God’s job to bring about outcomes." },
    { id: 17, text: "When I face a challenge, I spend meaningful time praying for guidance." },
    { id: 18, text: "Knowing that Jesus promised trials, I strive to keep the “light and momentary” nature of trials I face in perspective, looking toward a promised future." },
    { id: 19, text: "Though I have faced many challenges, God has been faithful." },
    { id: 20, text: "I have a core group of friends who are working with me in the leadership decisions I make." },
   
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
    }, 1000);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setIsTransitioning(false);
      }, 300);
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
              key={questions[currentQuestion].id}
              timeout={300}
              classNames="fade"
            >
              <div className="question">{questions[currentQuestion].text}</div>
            </CSSTransition>
          </TransitionGroup>

          <CustomSlider value={responses[currentQuestion]} onChange={handleSliderChange} />

          <div className="navigation-buttons">
            <button className="nav-button" onClick={previousQuestion} disabled={currentQuestion === 0 || isTransitioning}>
              <span className="arrow-icon">&#8592;</span> Previous
            </button>
            <button className="nav-button" onClick={nextQuestion} disabled={currentQuestion === questions.length - 1 || responses[currentQuestion] === null || isTransitioning}>
            Next <span className="arrow-icon right">&#8594;</span>
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
