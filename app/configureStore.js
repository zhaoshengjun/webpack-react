import { createStore } from 'redux';
import todoApp from './reducers';

const promise = (store) => (next) => (action) => {
  if (typeof action.then === 'function') {
    return action.then(next);
  }
  return next(action);
};

const logger = (store) => (next) => {
  if (!console.group) {
    return next;
  }
  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = next(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.slice()
    .reverse()
    .forEach(middleware =>
      store.dispatch = middleware(store)(store.dispatch)
    );
};

const configureStore = () => {
  // let isProduction = process.env.NODE_ENV === 'production';
  let isProduction = false;
  const middlewares = [promise];

  let store = createStore(todoApp);

  if (!isProduction) {
    // store = createStore(
    //   todoApp,
    //   window.devToolsExtension && window.devToolsExtension()
    // );
    middlewares.push(logger);
  // } else {
  //   store = createStore(todoApp);
  }

  // middlewares.push(promise);

  wrapDispatchWithMiddlewares(store, middlewares);
  return store;
}

export {configureStore};