import {createAction} from 'redux-actions';

import {EDIT_USER, LOGOUT, SET_USER} from '../constants/actions';

export const setUser = createAction(SET_USER);
export const editUser = createAction(EDIT_USER);
const logout = createAction(LOGOUT);

export const signOut = () => {
  return async (dispatch: Function) => {
    dispatch(logout);
    localStorage.clear();
    window.location.href = '/';
  };
};
