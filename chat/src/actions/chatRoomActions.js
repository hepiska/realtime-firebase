import { UPDATE_CHAT_FROMDB,SELECT_ROOM } from './constants'

export const updateChatRoomFromDb = newDataFromDb => ({ type: UPDATE_CHAT_FROMDB, payload: newDataFromDb });
export const selectroom = roomId => ({ type: SELECT_ROOM, payload: roomId });
