import QuestionTimer from './QuestionTimer';
import Answers from './Answers';
import QUESTIONS from '../questions.js';
import { useState } from 'react';

export default function Question({
  questionIndex,
  onSelectAnswer,
  onSkipAnswer,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  /**
   * If we have the answer whether it is correct or not
   * We set the timer to 2,000 milliseconds, because that's then
   * the time will take, until we move to the next question
   */
  if (answer.isCorrect !== null) {
  }

  function handleSelectAnswer(answer) {
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[questionIndex].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = '';

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        /** We only want to trigger the onSkipAnswer() function if no answer was selected
         * So, we have to put a condition here that checks if selectedAnswer is empty string (meaning no selected answer).
         * If not, then do nothing
         */
        onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
        mode={answerState}
      />
      {/**
       * We use key attribute and assigned a unique value to it. So that it resets the component.
       *
       **/}

      <h2>{QUESTIONS[questionIndex].text}</h2>
      <Answers
        answers={QUESTIONS[questionIndex].answers}
        selectedAnswer={answer.selectedAnswer}
        onSelect={handleSelectAnswer}
        answerState={answerState}
      />
    </div>
  );
}
