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
      <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
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
