import { useEffect, useState } from 'react';

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  /**
   * 3) We also have to wrap the setTimeout inside a useEffect() hook.
   *    Because everytime we update the `remainingTime` by calling state updating function `setRemainingTime()`, the component re-renders.
   *    And setTimeout, will be create a new instance. That will result to multiple timers being created.
   **/
  useEffect(() => {
    console.log('timeout');
    const timer = setTimeout(onTimeout, timeout);

    // Clean up function for setTimeout: This will automatically be executed by React
    // Before it runs the effect funtion or when this component is unmounted/removed from the DOM
    // We have to clean up the existing timer if this effect function is going to run again
    // So, that it doesn't matter if this function is called multiple times. (For example: StrictMode)
    // Because when we always clean up the old timer, we will only have one timer instance running always
    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);
  /**
   * 4) Now, we have to add `timeout`, and `onTimeout` as array dependencies. Since we're using those 2 props inside the useEffect()
   *    To make sure that this effect function gets re-executed if one of those dependencies changes.
   **/

  /**
   * 2) So, we put it inside the useEffect() hook, because everytime the state function is called, it re-renders the component
   *    And when the component is re-render, a new instance of setInterval is created. Which will also update the state again.
   *    And will quickly have multiple instances of intervals running that will re-execute this component and will result to infinite loop.
   **/
  useEffect(() => {
    console.log('interval');
    const interval = setInterval(() => {
      /**
       * 1) Since we have a state function call here, everytime this function is called it will re-evaluate/render the component.
       **/
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    // Clean up function for setInterval: This will automatically be executed by React
    // Before it runs the effect funtion or when this component is unmounted/removed from the DOM
    // We have to clean up the existing interval if this effect function is going to run again
    // So, that it doesn't matter if this function is called multiple times. (For example: StrictMode)
    // Because if we always clean up the old intervals, we will only have one interval running
    return () => {
      clearInterval(interval);
    };
  }, []); // dependency array are props, state, and all the variables and functions declared directly inside your component body

  return <progress id="question-time" max={timeout} value={remainingTime} />;
}
