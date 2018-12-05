import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import userReducer from '../reducers/userReducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      user: userReducer
    }),composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}
