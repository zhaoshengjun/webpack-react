import { v4 } from 'node-uuid';

const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

const addTodo = (text) => ({
    type: ADD_TODO,
    id: v4(),
    text
  });

const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id
  });

export {ADD_TODO, TOGGLE_TODO};
export { addTodo, toggleTodo};