import { useCallback, useState } from 'react';
import QUESTIONS from '../questions';
import Question from './Question';
import Summary from './Summary';

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);

  // Derived value, instead of using another state
  const activeQuestionIndex = userAnswer.length;

  const quizCompleted = activeQuestionIndex === QUESTIONS.length;

  /**
   * 2) Therefore, we should also use useCallback here.
   */
  const handleUserAnswer = useCallback(function handleUserAnswer(answer) {
    setUserAnswer((prevUserAnswers) => {
      return [...prevUserAnswers, answer];
    });
  }, []);

  /**
   * 1) Here, I wrap handleUserAnswer function with useCallback() hook in order for it to not change the function when the component re-renders.
   *    In other words, not to change its value or space in memory. And set it to handleSkipAnswer.
   *
   *    We did it because we pass this function as prop in <QuestionTimer /> component. And inside that component, we put it useEffect() hook
   *    And use it as a dependency in useEffect.
   *
   *    useCallback function has 2 params: 1st is the function, 2nd dependency array.
   *    In this useCallback function, we put the dependency `handleUserAnswer`.
   *    Because inside useCallback hook the anonymous function `() =>` is using it.
   *
   **/
  const handleSkipAnswer = useCallback(
    () => handleUserAnswer(null),
    [handleUserAnswer]
  );

  if (quizCompleted) {
    return <Summary userAnswer={userAnswer} />;
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionIndex={activeQuestionIndex}
        // questionText={QUESTIONS[activeQuestionIndex].text}
        // answers={QUESTIONS[activeQuestionIndex].answers}
        // selectedAnswer={userAnswer[userAnswer.length - 1]}
        onSelectAnswer={handleUserAnswer}
        onSkipAnswer={handleSkipAnswer}
        // answerState={answerState}
      />
    </div>
  );
}
