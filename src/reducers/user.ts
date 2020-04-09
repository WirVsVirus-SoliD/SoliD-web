import { fromJS } from "immutable";
import {
  EDIT_USER,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_USER
} from "~/constants/actions";

export const initialState = fromJS({
  login: false,
  loading: false,
  error: false,
  data: null
});

export function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return state.set("data", fromJS(action.payload));

    case EDIT_USER:
      return state.mergeIn(["data"], action.payload);

    case LOGIN_REQUEST:
      return state.set("loading", true).set("error", false).set("login", false);

    case LOGIN_SUCCESS:
      return state.set("loading", false).set("login", true);

    case LOGIN_FAIL:
      return state.set("loading", false).set("error", true);

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}
