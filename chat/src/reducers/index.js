import { combineReducers } from 'redux';

import UserReducer from './userReducer';

const RootReducer = combineReducers({
  users: UserReducer,
});

export default RootReducer;
