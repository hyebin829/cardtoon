import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import user from './user';
import post from './post';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  blacklist: ['post'],
};

const postPersistConfig = {
  key: 'post',
  storage: storageSession,
  blacklist: [
    'hasMorePost',
    'loadHomePostLoading',
    'loadHomePostDone',
    'loadHomePostError',
    'homePosts',
  ],
};

// const userPersistConfig = {
//   key: 'user',
//   storage: storageSession,
//   blacklist: [
//     'logInLoading',
//     'logInDone',
//     'logInError',
//     'logOutLoading',
//     'logOutDone',
//     'logOutError',
//     'signUpLoading',
//     'signUpDone',
//     'signUpError',
//   ],
// };

const rootReducer = combineReducers({
  post: persistReducer(postPersistConfig, post),
  // user: persistReducer(userPersistConfig, user),
  user,
});

export default persistReducer(persistConfig, rootReducer);
