import { useState } from 'react';

export default function Quiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);

  return <p>Current Active Question</p>;
}
