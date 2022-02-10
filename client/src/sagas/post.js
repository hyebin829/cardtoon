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
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
} from '../reducers/post';

function loadHomePostsAPI(lastId) {
  return axios.get(`/posts/homeposts?lastId=${lastId || 0}`);
}

function* loadHomePosts(action) {
  try {
    const result = yield call(loadHomePostsAPI, action.lastId);
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
  return axios.post('/post/homepost', data);
}

function* addHomePost(action) {
  try {
    const result = yield call(addHomePostAPI, action.data);
    yield put({
      type: ADD_HOMEPOST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_HOMEPOST_FAILURE,
      error: error.response.data,
    });
  }
}

function UploadImagesAPI(data) {
  return axios.post('/post/images', data);
}

function* UploadImages(action) {
  try {
    const result = yield call(UploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
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

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, UploadImages);
}

export default function* postSaga() {
  yield all([
    fork(watchAddHomePost),
    fork(watchLoadHomePosts),
    fork(watchUploadImages),
  ]);
}
