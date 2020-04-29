import {takeLatest, all} from 'redux-saga/effects';
import actionsTypes from '../constants';
import {logout} from './auth';
import {loadProfile} from './app';
export default function* root() {
  yield all([
    takeLatest(actionsTypes.LOGOUT, logout),
    takeLatest(actionsTypes.LOAD_PROFILE, loadProfile),
  ]);
}
