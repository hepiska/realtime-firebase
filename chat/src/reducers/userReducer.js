import { UPDATE_FROMDB } from "../actions/constants"

const initstate = []

const updateFromDb = (state, newData) => {
  return newData
}

const UserReducer = (state = initstate, action) => {
	switch (action.type) {
		case UPDATE_FROMDB : return updateFromDb(state,action.payload);

		default:return state;
	}
}

export default UserReducer
