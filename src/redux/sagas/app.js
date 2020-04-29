import {put, call, select} from 'redux-saga/effects';
import * as API from '../../services/api';
import {setAppLoading, setApp} from '../actions/app';
import {selectAuthId} from '../selectors/auth';

export function* loadProfile() {
  yield put(setAppLoading(true));

  const uid = yield select(selectAuthId);
  try {
    const res = yield call(API.getUserDetails, uid);
    yield put(setAppLoading(false));
    yield put(setApp({profile: res.items[0]}));
  } catch (error) {
    yield put(setAppLoading(false));
  }
}
