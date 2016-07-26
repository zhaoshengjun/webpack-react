import { v4 } from 'node-uuid';
import * as api from '../api';

const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const RECEIVE_TODOS = 'RECEIVE_TODOS';

const addTodo = (text) => ({
    type: ADD_TODO,
    id: v4(),
    text
  });

const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id
  });

const receiveTodos = (filter,response) =>({
  type:RECEIVE_TODOS,
  filter,
  response
});

const fetchTodos = (filter) => 
  api.fetchTodos(filter)
    .then(response => receiveTodos(filter, response));

export {ADD_TODO, TOGGLE_TODO, RECEIVE_TODOS};
export { addTodo, toggleTodo, receiveTodos, fetchTodos};