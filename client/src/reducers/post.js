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
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  // removeCommentLoading: false,
  // removeCommentDone: false,
  // removeCommentError: null,
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

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

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
        console.log(action.data);
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
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        const post = draft.homePosts.find(v => v.id === action.data.PostId);
        post.Comments.push(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        console.log(action.data);
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.homePosts = draft.homePosts.filter(
          v => v.id !== action.data.PostId,
          console.log(action.data)
        );
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case REMOVE_COMMENT_REQUEST:
        draft.removeCommentLoading = true;
        draft.removeCommentDone = false;
        draft.removeCommentError = null;
        break;
      case REMOVE_COMMENT_SUCCESS:
        draft.removeCommentLoading = false;
        draft.removeCommentDone = true;
        const CommentIdList = draft.homePosts.find(
          v => v.id === action.data.PostId
        );
        CommentIdList.Comments = CommentIdList.Comments.filter(
          v => v.id !== action.data.CommentId
        );
        break;
      case REMOVE_COMMENT_FAILURE:
        draft.removeCommentLoading = false;
        draft.removeCommentError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
