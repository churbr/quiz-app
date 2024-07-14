# Quiz App

## Important Notes

- Functions, in JavaScript are values, they are `object` type of values. And when a React component is re-rendered, a new object in memory is being created. And the function/object that was created before is not the same function created now. It is stored to a different location in memory. Hence, a new value in memory.
- In useState() hook, the state updating function returned by useState does not change on re-renders of the component. React guarantees that the state updating function returned by useState will always refer to the same function
-
