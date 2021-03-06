import { createAction } from "redux-actions";

import {
  CONFIRM_EMAIL_FAIL,
  CONFIRM_EMAIL_REQUEST,
  CONFIRM_EMAIL_SUCCESS,
  DELETE_HELPER_FAIL,
  DELETE_HELPER_REQUEST,
  DELETE_HELPER_SUCCESS,
  DELETE_PROVIDER_FAIL,
  DELETE_PROVIDER_REQUEST,
  DELETE_PROVIDER_SUCCESS,
  EDIT_USER,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
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
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  SET_USER,
  SET_USER_TYPE,
  UPDATE_HELPER_FAIL,
  UPDATE_HELPER_REQUEST,
  UPDATE_HELPER_SUCCESS,
  UPDATE_PROVIDER_FAIL,
  UPDATE_PROVIDER_REQUEST,
  UPDATE_PROVIDER_SUCCESS,
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
const forgotPasswordRequest = createAction(FORGOT_PASSWORD_REQUEST);
const forgotPasswordFail = createAction(FORGOT_PASSWORD_FAIL);
const forgotPasswordSuccess = createAction(FORGOT_PASSWORD_SUCCESS);
const confirmEmailRequest = createAction(CONFIRM_EMAIL_REQUEST);
const confirmEmailFail = createAction(CONFIRM_EMAIL_FAIL);
const confirmEmailSuccess = createAction(CONFIRM_EMAIL_SUCCESS);
const resetPasswordRequest = createAction(RESET_PASSWORD_REQUEST);
const resetPasswordFail = createAction(RESET_PASSWORD_FAIL);
const resetPasswordSuccess = createAction(RESET_PASSWORD_SUCCESS);
const registerProviderRequest = createAction(REGISTER_PROVIDER_REQUEST);
const registerProviderFail = createAction(REGISTER_PROVIDER_FAIL);
const registerProviderSuccess = createAction(REGISTER_PROVIDER_SUCCESS);
const registerHelperRequest = createAction(REGISTER_HELPER_REQUEST);
const registerHelperFail = createAction(REGISTER_HELPER_FAIL);
const registerHelperSuccess = createAction(REGISTER_HELPER_SUCCESS);
const updateProviderRequest = createAction(UPDATE_PROVIDER_REQUEST);
const updateProviderFail = createAction(UPDATE_PROVIDER_FAIL);
const updateProviderSuccess = createAction(UPDATE_PROVIDER_SUCCESS);
const updateHelperRequest = createAction(UPDATE_HELPER_REQUEST);
const updateHelperFail = createAction(UPDATE_HELPER_FAIL);
const updateHelperSuccess = createAction(UPDATE_HELPER_SUCCESS);
const deleteProviderRequest = createAction(DELETE_PROVIDER_REQUEST);
const deleteProviderFail = createAction(DELETE_PROVIDER_FAIL);
const deleteProviderSuccess = createAction(DELETE_PROVIDER_SUCCESS);
const deleteHelperRequest = createAction(DELETE_HELPER_REQUEST);
const deleteHelperFail = createAction(DELETE_HELPER_FAIL);
const deleteHelperSuccess = createAction(DELETE_HELPER_SUCCESS);
const logout = createAction(LOGOUT);

export const registerHelper = (input) => {
  return async (dispatch: Function) => {
    dispatch(registerHelperRequest());
    try {
      const response = await axiosInstance.post(api.helpers.collection, input);
      dispatch(registerHelperSuccess());
      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
      dispatch(registerHelperFail());
      return Promise.reject(error);
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
      dispatch(registerProviderSuccess());
      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
      dispatch(registerProviderFail());
      return Promise.reject(error);
    }
  };
};

export const confirmEmail = (token) => {
  return async (dispatch: Function) => {
    dispatch(confirmEmailRequest());
    try {
      const response = await axiosInstance.get(api.auth.activate(token));
      dispatch(confirmEmailSuccess());
      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
      dispatch(confirmEmailFail());
      return Promise.reject(error);
    }
  };
};

export const forgotPassword = (email) => {
  return async (dispatch: Function) => {
    dispatch(forgotPasswordRequest());
    try {
      const response = await axiosInstance.post(api.auth.initReset, { email });
      dispatch(forgotPasswordSuccess());
      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
      dispatch(forgotPasswordFail(error));
      return Promise.reject(error);
    }
  };
};

export const resetPassword = (values, token) => {
  return async (dispatch: Function) => {
    dispatch(resetPasswordRequest());
    try {
      const response = await axiosInstance.post(api.auth.reset, {
        ...values,
        token
      });
      dispatch(resetPasswordSuccess());
      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
      dispatch(resetPasswordFail(error));
      return Promise.reject(error);
    }
  };
};

export const uploadAvatar = (formData) => {
  return async (dispatch: Function) => {
    try {
      const response = await axiosInstance.post(api.media.upload, formData);
      console.log(response);
    } catch (error) {
      console.log(error);
      dispatch(updateProviderFail());
      return Promise.reject(error);
    }
  };
};

export const updateProvider = (input) => {
  return async (dispatch: Function) => {
    dispatch(updateProviderRequest());
    try {
      const response = await axiosInstance.put(api.providers.collection, input);
      dispatch(editUser(response.data));
      dispatch(updateProviderSuccess());
      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
      dispatch(updateProviderFail());
      return Promise.reject(error);
    }
  };
};

export const updateHelper = (input) => {
  return async (dispatch: Function) => {
    dispatch(updateHelperRequest());
    try {
      const response = await axiosInstance.put(api.helpers.collection, input);
      dispatch(editUser(response.data));
      dispatch(updateHelperSuccess());
      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
      dispatch(updateHelperFail());
      return Promise.reject(error);
    }
  };
};

export const deleteProvider = () => {
  return async (dispatch: Function) => {
    dispatch(deleteProviderRequest());
    try {
      const response = await axiosInstance.delete(api.providers.collection);
      dispatch(deleteProviderSuccess());
      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
      dispatch(deleteProviderFail());
      return Promise.reject(error);
    }
  };
};

export const deleteHelper = () => {
  return async (dispatch: Function) => {
    dispatch(deleteHelperRequest());
    try {
      const response = await axiosInstance.delete(api.helpers.collection);
      dispatch(deleteHelperSuccess());
      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
      dispatch(deleteHelperFail());
      return Promise.reject(error);
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
