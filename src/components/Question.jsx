import QuestionTimer from './QuestionTimer';
import Answers from './Answers';

export default function Question({
  questionText,
  answers,
  onSelectAnswer,
  selectedAnswer,
  onSkipAnswer,
  answerState,
}) {
  return (
    <div id="question">
      <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
      {/**
       * We use key attribute and assigned a unique value to it. So that it resets the component.
       *
       **/}

      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        onSelect={onSelectAnswer}
        answerState={answerState}
      />
    </div>
  );
}
