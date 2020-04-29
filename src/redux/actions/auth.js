import actionsTypes from '../constants';

export const setAuth = payload => ({
  type: actionsTypes.SET_AUTH,
  payload,
});

export const logout = () => ({type: actionsTypes.LOGOUT});

export const initAuth = () => ({type: actionsTypes.INIT_AUTH});
