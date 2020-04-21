import { createAction } from "redux-actions";

import {
  EDIT_USER,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_HELPER_FAIL,
  REGISTER_HELPER_REQUEST,
  REGISTER_HELPER_SUCCESS,
  REGISTER_PROVIDER_FAIL,
  REGISTER_PROVIDER_REQUEST,
  REGISTER_PROVIDER_SUCCESS,
  SET_USER,
  SET_USER_TYPE,
  VALIDATE_FAIL,
  VALIDATE_REQUEST,
  VALIDATE_SUCCESS
} from "~/constants/actions";
import api from "~/lib/api";
import axiosInstance from "~/lib/axiosInstance";
import history from "~/lib/history";
import storage from "~/lib/storage";

const setUser = createAction(SET_USER);
const setUserType = createAction(SET_USER_TYPE);
const editUser = createAction(EDIT_USER);
const loginRequest = createAction(LOGIN_REQUEST);
const loginFail = createAction(LOGIN_FAIL);
const loginSuccess = createAction(LOGIN_SUCCESS);
const validateRequest = createAction(VALIDATE_REQUEST);
const validateFail = createAction(VALIDATE_FAIL);
const validateSuccess = createAction(VALIDATE_SUCCESS);
const registerProviderRequest = createAction(REGISTER_PROVIDER_REQUEST);
const registerProviderFail = createAction(REGISTER_PROVIDER_FAIL);
const registerProviderSuccess = createAction(REGISTER_PROVIDER_SUCCESS);
const registerHelperRequest = createAction(REGISTER_HELPER_REQUEST);
const registerHelperFail = createAction(REGISTER_HELPER_FAIL);
const registerHelperSuccess = createAction(REGISTER_HELPER_SUCCESS);
const logout = createAction(LOGOUT);

export const registerHelper = (input) => {
  return async (dispatch: Function) => {
    dispatch(registerHelperRequest());
    try {
      const response = await axiosInstance.post(api.helpers.collection, input);
      console.log(response);
      dispatch(registerHelperSuccess());
      return Promise.resolve({ response });
    } catch (error) {
      console.log(error);
      dispatch(registerHelperFail());
      return Promise.reject({ error });
    }
  };
};

export const registerProvider = (input) => {
  return async (dispatch: Function) => {
    dispatch(registerProviderRequest());
    try {
      const response = await axiosInstance.post(
        api.providers.collection,
        input
      );
      console.log(response);
      dispatch(registerProviderSuccess());
      return Promise.resolve({ response });
    } catch (error) {
      console.log(error);
      dispatch(registerProviderFail());
      return Promise.reject({ error });
    }
  };
};

export const login = (email, password, redirect) => {
  return async (dispatch: Function) => {
    dispatch(loginRequest());
    try {
      const response = await axiosInstance.post(api.auth.login, {
        email,
        password
      });
      storage.setAccessToken(response.data.accessToken);
      dispatch(setUserType(response.data.type));
      dispatch(loginSuccess());
      dispatch(setUser(response.data.data));
      if (!redirect) redirect = "/dashboard";
      history.push(redirect);
    } catch (error) {
      console.log(error);
      dispatch(loginFail());
    }
  };
};

export const validate = (redirect) => {
  return async (dispatch: Function) => {
    dispatch(validateRequest());
    try {
      const response = await axiosInstance.get(api.auth.validate);
      dispatch(setUserType(response.data.type));
      dispatch(setUser(response.data.data));
      dispatch(validateSuccess());
      if (!redirect) redirect = "/dashboard";
      return Promise.resolve({ response, redirect });
    } catch (error) {
      console.log("ERROR IN VALIDATING USER", error);
      dispatch(validateFail());
      return Promise.reject(error);
    }
  };
};

export const logOut = () => {
  return async (dispatch: Function) => {
    dispatch(logout());
    storage.clearStorage();
    window.location.href = "/";
  };
};
