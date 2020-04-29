import actionTypes from '../constants';

const initialState = {
  loading: false,
  profile: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_APP_LOADING:
      return {...state, loading: action.payload};
    case actionTypes.SET_APP:
      return {...state, ...action.payload};
    case actionTypes.INIT_APP:
      return initialState;
    default:
      return state;
  }
};
