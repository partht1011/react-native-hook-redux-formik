import actionTypes from '../constants';
import DeviceInfo from 'react-native-device-info';

const initialState = {
  loggedIn: false,
  uid: null,
  token: {},
  sessionid: DeviceInfo.getUniqueId(),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH:
      return {...state, ...action.payload};
    case actionTypes.INIT_AUTH:
      return initialState;
    default:
      return state;
  }
};
