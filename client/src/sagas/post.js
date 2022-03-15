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
  LOAD_HOTPOSTS_FAILURE,
  LOAD_HOTPOSTS_REQUEST,
  LOAD_HOTPOSTS_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_FAILURE,
  REMOVE_POST_SUCCESS,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_FAILURE,
  REMOVE_COMMENT_SUCCESS,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  LOAD_USER_POST_REQUEST,
  LOAD_USER_POST_FAILURE,
  LOAD_USER_POST_SUCCESS,
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

function loadHotPostsAPI() {
  return axios.get('/posts/hotcardtoon');
}

function* loadHotPosts(action) {
  try {
    const result = yield call(loadHotPostsAPI, action.data);
    yield put({
      type: LOAD_HOTPOSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_HOTPOSTS_FAILURE,
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

function uploadImagesAPI(data) {
  return axios.post('/post/images', data);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
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

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: error.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete(`/post/${data}`);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function removeCommentAPI(data) {
  return axios.delete(`/post/${data.postId}/comment/${data.commentId}`);
}

function* removeComment(action) {
  try {
    const result = yield call(removeCommentAPI, action.data);
    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: REMOVE_COMMENT_FAILURE,
      error: error.response.data,
    });
  }
}

function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`);
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LIKE_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function unlikePostAPI(data) {
  return axios.delete(`/post/${data}/like`);
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function loadUserPostAPI(data) {
  return axios.get(`/post/${data}`);
}

function* loadUserPost(action) {
  try {
    const result = yield call(loadUserPostAPI, action.data);
    yield put({
      type: LOAD_USER_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_USER_POST_FAILURE,
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
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchRemoveComment() {
  yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}
function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

function* watchLoadHotPosts() {
  yield takeLatest(LOAD_HOTPOSTS_REQUEST, loadHotPosts);
}
function* watchLoadUserPost() {
  yield takeLatest(LOAD_USER_POST_REQUEST, loadUserPost);
}

export default function* postSaga() {
  yield all([
    fork(watchAddHomePost),
    fork(watchLoadHomePosts),
    fork(watchUploadImages),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchRemoveComment),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchLoadHotPosts),
    fork(watchLoadUserPost),
  ]);
}
