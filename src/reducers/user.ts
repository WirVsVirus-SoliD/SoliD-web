import { fromJS } from "immutable";
import { EDIT_USER, LOGOUT, SET_USER } from "../constants/actions";

// Prettier commit
export const initialState = fromJS({
  id: null,
  email: null,
});

export function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return state.merge(action.payload);

    case EDIT_USER:
      return state.merge(action.payload);

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}
