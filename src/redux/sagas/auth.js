import {put} from 'redux-saga/effects';
import {initApp} from '../actions/app';
import {initAuth} from '../actions/auth';
import navHelper from '../../utils/navHelper';

export function* logout() {
  yield put(initApp());
  yield put(initAuth());
  navHelper.navigate('LogIn');
}
