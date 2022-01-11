import axios from 'axios';
import {
  all,
  delay,
  fork,
  put,
  takeLatest,
  call,
  putResolve,
  take,
} from 'redux-saga/effects';
import {
  ADD_HOMEPOST_FAILURE,
  ADD_HOMEPOST_REQUEST,
  ADD_HOMEPOST_SUCCESS,
} from '../reducers/post';

function addHomePostAPI(data) {
  return axios.post('/post', { content: data });
}

function* addHomePost(action) {
  try {
    const result = yield call(addHomePostAPI, action.data);
    yield put({
      type: ADD_HOMEPOST_SUCCESS,
      data: result.data,
    });
    console.log('homepostsuccess');
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_HOMEPOST_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchAddHomePost() {
  yield takeLatest(ADD_HOMEPOST_REQUEST, addHomePost);
}

export default function* postSaga() {
  yield all([fork(watchAddHomePost)]);
}
