import { createAction } from "redux-actions";
import { helper } from "~/actions/userData";

import {
  EDIT_USER,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_USER
} from "~/constants/actions";
import axiosInstance from "~/lib/axiosInstance";
import history from "~/lib/history";
import solidApi from "~/lib/solidApi";
import storage from "~/lib/storage";

const setUser = createAction(SET_USER);
const editUser = createAction(EDIT_USER);
const loginRequest = createAction(LOGIN_REQUEST);
const loginFail = createAction(LOGIN_FAIL);
const loginSuccess = createAction(LOGIN_SUCCESS);
const logout = createAction(LOGOUT);

export const login = (email, password, redirect) => {
  return async (dispatch: Function) => {
    dispatch(loginRequest());
    try {
      const response = await axiosInstance.post(solidApi.auth.login, {
        username: email,
        password
      });
      const accessToken = response.data.accessToken;
      storage.setToken(accessToken);
      dispatch(loginSuccess());
      dispatch(setUser(helper));
      // TODO Set User
      // TODO REDIRECT? WHERE TO?
      history.push(redirect);
    } catch (error) {
      console.log(error);
      dispatch(loginFail());
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
