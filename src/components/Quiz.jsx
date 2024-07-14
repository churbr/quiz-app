import { useCallback, useState } from 'react';
import QUESTIONS from '../questions';
import quizCompletedImg from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer';

export default function Quiz() {
  // const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);

  // Derived value, instead of using another state
  const activeQuestionIndex = userAnswer.length;

  const quizCompleted = activeQuestionIndex === QUESTIONS.length;

  /**
   * 2) Therefore, we should also use useCallback here.
   */
  const handleUserAnswer = useCallback(
    function handleUserAnswer(answer) {
      setUserAnswer((prevUserAnswers) => {
        return [...prevUserAnswers, answer];
      });
    },
    []
    /**
     * 3) But here, we don't add anything to dependency array because we're not using any state or props
     *    And also, no any other values that depend on state/props.
     *
     *    The state updating function `setUserAnswer`, don't need to be added in the dependency
     *    Because React guarantee that they never change
     */
  );

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

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer} />
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
