import { combineReducers } from 'redux';

import UserReducer from './userReducer';
import {ChatRoomReducer,selectedRoom} from './chatRoomReducer'
const RootReducer = combineReducers({
  users: UserReducer,
  chatrooms: ChatRoomReducer,
  selectedRoom:selectedRoom,
});

export default RootReducer;
