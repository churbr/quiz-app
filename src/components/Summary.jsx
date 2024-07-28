import quizCompletedImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';

export default function Summary({ userAnswer }) {
  const skippedAnswers = userAnswer.filter((answer) => answer === null);
  const correctAnswer = userAnswer.filter(
    (answer, index) => QUESTIONS[index].answers[0] === answer
  );

  const skippedAnswerPercentage = Math.round(
    (skippedAnswers.length / userAnswer.length) * 100
  );

  const correctAnswerPercentage = Math.round(
    (correctAnswer.length / userAnswer.length) * 100
  );

  const wrongAnswerPercentage =
    100 - skippedAnswerPercentage - correctAnswerPercentage;

  return (
    <div id="summary">
      <img src={quizCompletedImg} alt="Trophy" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswerPercentage}%</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswerPercentage}%</span>
          <span className="text">Correct Answered</span>
        </p>
        <p>
          <span className="number">{wrongAnswerPercentage}%</span>
          <span className="text">Incorrect Answer</span>
        </p>
      </div>
      <ol>
        {userAnswer.map((answer, index) => {
          let cssClass = 'user-answer';

          if (answer === null) {
            // when means, it's skipped
            cssClass += ' skipped';
          } else if (answer === QUESTIONS[index].answers[0]) {
            // if its correct
            cssClass += ' correct';
          } else {
            cssClass += ' wrong';
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? 'Skipped'}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
