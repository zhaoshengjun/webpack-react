// import 'babel-polyfill';
import React, {Component} from 'react';
import {render} from 'react-dom';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

// import {Grid, Row} from 'react-flexbox-grid/lib';
// import Button from './components/button';
// import Box from './components/box/box';

// const App = () => (
//   <Grid fluid>  
//     <MuiThemeProvider>
//       <Button />
//     </MuiThemeProvider>
//     <Row>
//       <Box type="row" xs={12} sm={3} md={2} lg={1} />
//       <Box type="row" xs={6} sm={6} md={8} lg={10} />
//       <Box type="row" xs={6} sm={3} md={2} lg={1} />
//     </Row>
//     <Row>
//       <Box type="row" xs={12} sm={3} md={2} lg={1} />
//       <Box type="row" xs={12} sm={9} md={10} lg={11} />
//     </Row>
//     <Row>
//       <Box type="row" xs={10} sm={6} md={8} lg={10} />
//       <Box type="row" xs={2} sm={6} md={4} lg={2} />
//     </Row>
//   </Grid>
// );
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

let store = createStore(todoApp, window.devToolsExtension && window.devToolsExtension())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
)
