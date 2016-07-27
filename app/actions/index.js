import { v4 } from 'node-uuid';
import * as api from '../api';
import { getIsFetching } from '../reducers';


const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';

const addTodo = (text) => ({
  type: ADD_TODO,
  id: v4(),
  text
});

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id
});


const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }

  dispatch({
    type: FETCH_TODOS_REQUEST,
    filter
  });

  return api.fetchTodos(filter)
    .then(response => {
      dispatch({
        type: FETCH_TODOS_SUCCESS,
        filter,
        response
      });
    }, err => {
      dispatch({
        type: FETCH_TODOS_FAILURE,
        filter,
        message: err.message || 'Something went wrong'
      })
    });
}

export {ADD_TODO, TOGGLE_TODO, FETCH_TODOS_REQUEST, FETCH_TODOS_FAILURE, FETCH_TODOS_SUCCESS};
export { addTodo, toggleTodo,  fetchTodos};