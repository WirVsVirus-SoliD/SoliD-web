import { fromJS } from "immutable";
import {
  GET_PROVIDERS_REQUEST,
  GET_PROVIDERS_SUCCESS,
  SET_HIGHLIGHTED
} from "~/constants/actions";

const initialState = fromJS({
  loading: false,
  geoJson: null,
  highlighted: null
});

export function providers(state = initialState, action) {
  switch (action.type) {
    case GET_PROVIDERS_REQUEST:
      return state.set("loading", true);

    case GET_PROVIDERS_SUCCESS:
      return state.set("loading", false).set("geoJson", action.payload);

    case SET_HIGHLIGHTED:
      return state.set("highlighted", action.payload);

    default:
      return state;
  }
}
