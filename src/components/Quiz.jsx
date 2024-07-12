import { useState } from 'react';
import QUESTIONS from '../questions';

export default function Quiz() {
  // const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);

  // Derived value, instead of using another state
  const activeQuestionIndex = userAnswer.length;

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
          {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
            <li className="answer" key={answer}>
              <button onClick={() => handleUserAnswer(answer)}>{answer}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
