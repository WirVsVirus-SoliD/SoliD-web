import { createAction } from "redux-actions";
import {
  GET_FAVORITES_FAIL,
  GET_FAVORITES_REQUEST,
  GET_FAVORITES_SUCCESS
} from "~/constants/actions";
import api from "~/lib/api";
import axiosInstance from "~/lib/axiosInstance";

const getFavoritesRequest = createAction(GET_FAVORITES_REQUEST);
const getFavoritesFail = createAction(GET_FAVORITES_FAIL);
const getFavoritesSuccess = createAction(GET_FAVORITES_SUCCESS);

export function getFavorites() {
  return async (dispatch, getState) => {
    dispatch(getFavoritesRequest());
    try {
      const response = await axiosInstance.get(api.favorites.collection);
      dispatch(getFavoritesSuccess(response.data));
    } catch (error) {
      console.log("ERROR GET INQUIRIES", error);
      dispatch(getFavoritesFail(error));
    }
  };
}
