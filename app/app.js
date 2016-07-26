import 'babel-polyfill';
import React, {Component} from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { configureStore } from './configureStore';
import { Root } from './components/Root';
import { fetchTodos } from './api';

// fetchTodos('active')
//   .then( todos => console.log(todos));

// let todos = fetchTodos('active');
// console.log(todos);

const store = configureStore();

render(
  <Root store={store} />,
  document.querySelector('#app')
)
