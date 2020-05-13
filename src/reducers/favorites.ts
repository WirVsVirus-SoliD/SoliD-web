import { fromJS } from "immutable";
import {
  GET_FAVORITES_FAIL,
  GET_FAVORITES_REQUEST,
  GET_FAVORITES_SUCCESS
} from "~/constants/actions";

const initialState = fromJS({
  loading: false,
  error: false,
  items: null
});

export function favorites(state = initialState, action) {
  switch (action.type) {
    case GET_FAVORITES_REQUEST:
      return state.set("loading", true).set("error", false);

    case GET_FAVORITES_SUCCESS:
      return state.set("loading", false).set("items", action.payload);

    case GET_FAVORITES_FAIL:
      return state.set("loading", false).set("error", true);

    default:
      return state;
  }
}
