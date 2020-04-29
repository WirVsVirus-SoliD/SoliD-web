import { createAction } from "redux-actions";
import {
  GET_PROVIDERS_FAIL,
  GET_PROVIDERS_REQUEST,
  GET_PROVIDERS_SUCCESS,
  SET_HIGHLIGHTED
} from "~/constants/actions";
import api from "~/lib/api";
import axiosInstance from "~/lib/axiosInstance";

const getProvidersRequest = createAction(GET_PROVIDERS_REQUEST);
const getProvidersFail = createAction(GET_PROVIDERS_FAIL);
const getProvidersSuccess = createAction(GET_PROVIDERS_SUCCESS);
const setHighlighted = createAction(SET_HIGHLIGHTED);

export function getProviders() {
  return async (dispatch, getState) => {
    dispatch(getProvidersRequest());
    try {
      const response = await axiosInstance.get(api.providers.collection);
      dispatch(getProvidersSuccess(response.data));
    } catch (error) {
      console.log("ERROR GET PROVIDERS", error);
      dispatch(getProvidersFail(error));
    }
  };
}

export function setHighlightedProvider(provider) {
  return async (dispatch, getState) => {
    dispatch(setHighlighted(provider));
  };
}
