import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import RootReducer from '../reducers';

const middleWares = applyMiddleware(logger, thunk);
const store = createStore(RootReducer, middleWares);

export default store;
