import { useRef } from 'react';

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  /**
   * We create a useRef value, but not for the reason to connect some html element to it
   * But instead to manage some value, which will not change if the component function is executed again
   */
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        let cssClasses = '';
        const isSelected = selectedAnswer === answer;

        if (answerState === 'answered' && isSelected) {
          cssClasses = 'selected';
        }

        if (
          (answerState === 'correct' || answerState === 'wrong') &&
          isSelected
        ) {
          cssClasses = answerState;
        }

        return (
          <li className="answer" key={answer}>
            <button
              className={cssClasses}
              onClick={() => onSelect(answer)}
              disabled={answerState !== ''}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
