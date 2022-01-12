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
  LOAD_HOMEPOSTS_FAILURE,
  LOAD_HOMEPOSTS_REQUEST,
  LOAD_HOMEPOSTS_SUCCESS,
} from '../reducers/post';

function loadHomePostsAPI(data) {
  return axios.get('/posts/homeposts', data);
}

function* loadHomePosts(action) {
  try {
    const result = yield call(loadHomePostsAPI, action.data);
    yield put({
      type: LOAD_HOMEPOSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_HOMEPOSTS_FAILURE,
    });
    console.error(error);
  }
}

function addHomePostAPI(data) {
  return axios.post('/post/homepost', { content: data });
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

function* watchLoadHomePosts() {
  yield takeLatest(LOAD_HOMEPOSTS_REQUEST, loadHomePosts);
}

export default function* postSaga() {
  yield all([fork(watchAddHomePost), fork(watchLoadHomePosts)]);
}
