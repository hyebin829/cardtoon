import produce from 'immer';

export const initialState = {
  homePosts: [],
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
      default:
        break;
    }
  });

export default reducer;
