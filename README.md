# Quiz App

## Important Notes

- Functions, in JavaScript are values, they are `object` type of values. And when a React component is re-rendered, a new object in memory is being created. And the function/object that was created before is not the same function created now. It is stored to a different location in memory. Hence, a new value in memory.
- In useState() hook, the state updating function returned by useState does not change on re-renders of the component. React guarantees that the state updating function returned by useState will always refer to the same function
- useCallback() hook allows you to memoize a function instance between renders. It returns a memoized version of the callback function that only changes if one of the dependencies has changed. This is particularly useful when passing callbacks to child components to prevent unnecessary re-renders
- The `key` atttribute in React is not only can be used in lists. But can also be used in components. We know that in React, when a prop or state value in a component changes, the component will re-render. But there are times a component has values that doesn't change but we have to re-render it. This is a when you use key, and assign a value that changes so that it will re-evaluate.

##### A good example of this is the `<QuestionTimer />` component inside `<Quiz>` component. There will be 10 seconds countdown and the progressbar will decrease. If the user was not able to answer in 10 seconds, next question will be shown.

##### We have the question in the h2 tag and answers in unordered list. The values of the question & answers change but the progress bar doesn't. Since the progressbar component (<QuizTimer />) doesn't change. It will not re-render, resulting to a non-moving bar when the next question is shown.

##### So, what we want is that everytime the next question is shown, the loading screen will reset and start the countdown again. `A simple solution is to use key` attribute in the component and assign a value that changes when a question changes. So that they will be in sync. And progressbar will reset countdown on every question
