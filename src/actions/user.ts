import { createAction } from "redux-actions";

import { EDIT_USER, LOGOUT, SET_USER } from "~/constants/actions";
import axiosInstance from "~/lib/axiosInstance";
import solidApi from "~/lib/solidApi";
import storage from "~/lib/storage";

export const setUser = createAction(SET_USER);
export const editUser = createAction(EDIT_USER);
const logout = createAction(LOGOUT);

export const login = (email, password) => {
  return async (dispatch: Function) => {
    try {
      const response = await axiosInstance.post(solidApi.auth.login, {
        username: email,
        password
      });
      const accessToken = response.data.accessToken;
      storage.setToken(accessToken);
      // TODO Set User
      // TODO REDIRECT? WHERE TO?
    } catch (error) {
      console.log(error);
    }
  };
};

export const signOut = () => {
  return async (dispatch: Function) => {
    dispatch(logout);
    localStorage.clear();
    window.location.href = "/";
  };
};
