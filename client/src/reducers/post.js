import produce from 'immer';

export const initialState = {
  homePosts: [],
  imagePaths: [],
  addHomePostLoading: false,
  addHomePostDone: false,
  addHomePostError: null,
  hasMorePost: true,
  loadHomePostsLoading: false,
  loadHomePostsDone: false,
  loadHomePostsError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
};

export const ADD_HOMEPOST_REQUEST = 'ADD_HOMEPOST_REQUEST';
export const ADD_HOMEPOST_SUCCESS = 'ADD_HOMEPOST_SUCCESS';
export const ADD_HOMEPOST_FAILURE = 'ADD_HOMEPOST_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const LOAD_HOMEPOSTS_REQUEST = 'LOAD_HOMEPOSTS_REQUEST';
export const LOAD_HOMEPOSTS_SUCCESS = 'LOAD_HOMEPOSTS_SUCCESS';
export const LOAD_HOMEPOSTS_FAILURE = 'LOAD_HOMEPOSTS_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const addHomePost = data => ({
  type: ADD_HOMEPOST_REQUEST,
  data,
});

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
        break;
      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      case UPLOAD_IMAGES_SUCCESS:
        draft.imagePaths = action.data;
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        break;
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;
      case ADD_HOMEPOST_REQUEST:
        draft.addHomePostLoading = true;
        draft.addHomePostDone = false;
        draft.addHomePostError = null;
        break;
      case ADD_HOMEPOST_SUCCESS:
        draft.addHomePostLoading = false;
        draft.addHomePostDone = true;
        draft.homePosts.unshift(action.data);
        draft.imagePaths = [];
        break;
      case ADD_HOMEPOST_FAILURE:
        draft.addHomePostLoading = false;
        draft.addHomePostError = action.error;
        break;
      case LOAD_HOMEPOSTS_REQUEST:
        draft.loadHomePostsLoading = true;
        draft.loadHomePostsDone = false;
        draft.loadHomePostsError = null;
        break;
      case LOAD_HOMEPOSTS_SUCCESS:
        draft.loadHomePostsDone = true;
        draft.loadHomePostsError = null;
        draft.loadHomePostsLoading = false;
        draft.homePosts = draft.homePosts.concat(action.data);
        draft.hasMorePost = action.data.length === 5;
        break;
      case LOAD_HOMEPOSTS_FAILURE:
        draft.loadHomePostsDone = false;
        draft.loadHomePostsError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
