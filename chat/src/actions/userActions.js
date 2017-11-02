import { UPDATE_FROMDB } from './constants'

export const updateFromDb = newDataFromDb => ({ type: UPDATE_FROMDB, payload: newDataFromDb });
