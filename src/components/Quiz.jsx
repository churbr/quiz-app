import { useState } from 'react';
import QUESTIONS from '../questions';
import quizCompletedImg from '../assets/quiz-complete.png';

export default function Quiz() {
  // const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);

  // Derived value, instead of using another state
  const activeQuestionIndex = userAnswer.length;

  const quizCompleted = activeQuestionIndex === QUESTIONS.length;

  if (quizCompleted) {
    return (
      <div id="summary">
        <img src={quizCompletedImg} alt="Trophy" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  // We need to create a new array because we don't want to change the original array
  // Because in the original array contains the correct value, which is always the first index
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];

  // To shuffle, negative number
  // To retain its original order any positive number
  shuffledAnswers.sort(() => Math.random - 0.5);

  const handleUserAnswer = (answer) => {
    setUserAnswer((prevUserAnswers) => {
      return [...prevUserAnswers, answer];
    });
  };

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li className="answer" key={answer}>
              <button onClick={() => handleUserAnswer(answer)}>{answer}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
