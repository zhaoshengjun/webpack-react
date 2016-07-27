import * as api from '../api';
import { getIsFetching } from '../reducers';
import { normalize } from 'normalizr';
import * as schema from './schema';

const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
const TOGGLE_TODO_SUCCESS = 'TOGGLE_TODO_SUCCESS';
const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';

const addTodo = (text) => (dispatch) =>
  api.addTodo(text).then(response => {    
    dispatch({
      type: ADD_TODO_SUCCESS,
      response: normalize(response, schema.todo)
    })
  });  

const toggleTodo = (id) => (dispatch) =>
  api.toggleTodo(id).then(response => {
    dispatch({
      type: TOGGLE_TODO_SUCCESS,
      response: normalize(response, schema.todo)
    })
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
        response:normalize(response, schema.arrayofTodos)
      });
    }, err => {
      dispatch({
        type: FETCH_TODOS_FAILURE,
        filter,
        message: err.message || 'Something went wrong'
      })
    });
}

export {ADD_TODO_SUCCESS, TOGGLE_TODO_SUCCESS, FETCH_TODOS_REQUEST, FETCH_TODOS_FAILURE, FETCH_TODOS_SUCCESS};
export { addTodo, toggleTodo,  fetchTodos};