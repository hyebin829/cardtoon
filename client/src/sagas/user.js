import axios from 'axios';
import {
  all,
  delay,
  fork,
  put,
  takeLatest,
  call,
  putResolve,
} from 'redux-saga/effects';

import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '../reducers/user';

function logInAPI(data) {
  return axios.post('/api/login', data);
}

function* logIn(action) {
  try {
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_IN_FAILURE,
      error: error.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post('/api/logout');
}

function* logOut() {
  try {
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data,
    });
  }
}

function signUpAPI(data) {
  console.log(data);
  return axios.post('http://localhost:3065/user', data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: SIGN_UP_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}
export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchSignUp)]);
}
