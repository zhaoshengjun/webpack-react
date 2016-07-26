import { createStore } from 'redux';
import todoApp from './reducers';
import { loadState, saveState } from './localStorage';
import { throttle } from 'lodash';

const configureStore = () => {
  const persistedState = loadState();

  let store = createStore(
    todoApp,
    persistedState,
    window.devToolsExtension && window.devToolsExtension()
  );

  console.log(store.getState());

  store.subscribe(throttle(() => {
    saveState({
      todos:store.getState().todos
    });
  }), 1000);
  
  return store;
}

export {configureStore};