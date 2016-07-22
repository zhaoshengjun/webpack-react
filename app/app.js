import React, {Component} from 'react';
import {render} from 'react-dom';

const App = () => (
  <h1>Hello Webpack / React!</h1>
)

render(
  <App />,
  document.querySelector('#app')
)
