import produce from 'immer';

export const initialState = {
  homePosts: [],
  addHomePostLoading: false,
  addHomePostDone: false,
  addHomePostError: null,
};

export const ADD_HOMEPOST_REQUEST = 'ADD_HOMEPOST_REQUEST';
export const ADD_HOMEPOST_SUCCESS = 'ADD_HOMEPOST_SUCCESS';
export const ADD_HOMEPOST_FAILURE = 'ADD_HOMEPOST_FAILURE';

export const addHomePost = data => ({
  type: ADD_HOMEPOST_REQUEST,
  data,
});

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_HOMEPOST_REQUEST:
        draft.addHomePostLoading = true;
        draft.addHomePostDone = false;
        draft.addHomePostError = null;
        break;
      case ADD_HOMEPOST_SUCCESS:
        draft.addHomePostLoading = false;
        draft.addHomePostDone = true;
        draft.homePosts.unshift(action.data);
        break;
      case ADD_HOMEPOST_FAILURE:
        draft.addHomePostLoading = false;
        draft.addHomePostError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
