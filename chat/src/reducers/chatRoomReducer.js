import { UPDATE_CHAT_FROMDB,SELECT_ROOM } from "../actions/constants"

const initstate = []

const updateFromDb = (state, newData) => {
  return newData
}

const ChatRoomReducer = (state = initstate, action) => {
	switch (action.type) {
		case UPDATE_CHAT_FROMDB : return updateFromDb(state,action.payload);

		default:return state;
	}
}

const selectedRoom = (state = '', action ) => {
  switch (action.type) {
		case SELECT_ROOM : return action.payload;

		default:return state;
	}
}

export {
  ChatRoomReducer,
  selectedRoom
}
