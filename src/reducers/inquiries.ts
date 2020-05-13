import { fromJS } from "immutable";
import {
  GET_INQUIRIES_FAIL,
  GET_INQUIRIES_REQUEST,
  GET_INQUIRIES_SUCCESS
} from "~/constants/actions";

const initialState = fromJS({
  loading: false,
  error: false,
  items: null
});

export function inquiries(state = initialState, action) {
  switch (action.type) {
    case GET_INQUIRIES_REQUEST:
      return state.set("loading", true).set("error", false);

    case GET_INQUIRIES_SUCCESS:
      return state.set("loading", false).set("items", action.payload);

    case GET_INQUIRIES_FAIL:
      return state.set("loading", false).set("error", true);

    default:
      return state;
  }
}
