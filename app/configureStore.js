import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import todoApp from './reducers';


const configureStore = () => {
  // let isProduction = process.env.NODE_ENV === 'production';
  const isProduction = false;
  const middlewares = [promise];

  if (!isProduction) {
    middlewares.push(createLogger());
  }
  
  return createStore(
    todoApp,
    applyMiddleware(...middlewares)
  );
  
};

export {configureStore};