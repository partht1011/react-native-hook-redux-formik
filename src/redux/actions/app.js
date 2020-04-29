import actionsTypes from '../constants';

export const setAppLoading = payload => ({
  type: actionsTypes.SET_APP_LOADING,
  payload,
});

export const setApp = payload => ({
  type: actionsTypes.SET_APP,
  payload,
});

export const initApp = () => ({type: actionsTypes.INIT_APP});

export const loadProfile = () => ({type: actionsTypes.LOAD_PROFILE});
