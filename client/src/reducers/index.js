import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import user from './user';
import post from './post';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  // whitelist: ['user'],
};

const rootReducer = combineReducers({
  user,
  post,
});

export default persistReducer(persistConfig, rootReducer);
