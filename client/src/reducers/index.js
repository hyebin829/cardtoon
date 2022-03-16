import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import user from './user';
import post from './post';

// const persistConfig = {
//   key: 'root',
//   storage: storageSession,
//   // whitelist: ['userProfile'],
//   // blacklist: ['hasMorePost', 'loadHomePostsLoading'],
// };

const rootReducer = combineReducers({
  user,
  post,
});

export default rootReducer;
