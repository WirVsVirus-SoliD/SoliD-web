import { fromJS } from "immutable";
import {
  EDIT_USER,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_USER,
  SET_USER_TYPE,
  VALIDATE_FAIL,
  VALIDATE_REQUEST,
  VALIDATE_SUCCESS
} from "~/constants/actions";

export const initialState = fromJS({
  login: false,
  loading: false,
  validating: false,
  error: false,
  type: null,
  data: null
});

export function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return state.set("data", fromJS(action.payload));

    case EDIT_USER:
      return state.mergeIn(["data"], action.payload);

    case SET_USER_TYPE:
      return state.set("type", action.payload);

    case LOGIN_REQUEST:
      return state.set("loading", true).set("error", false).set("login", false);

    case LOGIN_SUCCESS:
      return state.set("loading", false).set("login", true);

    case LOGIN_FAIL:
      return state.set("loading", false).set("error", true);

    case VALIDATE_REQUEST:
      return state.set("validating", true).set("error", false);

    case VALIDATE_SUCCESS:
      return state.set("validating", false).set("login", true);

    case VALIDATE_FAIL:
      return state
        .set("validating", false)
        .set("error", true)
        .set("login", false);

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}
