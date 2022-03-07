import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import user from './user';
import post from './post';

const persistConfig = {
  key: 'root',
  storage,
  whiltelist: ['auth'],
};

const rootReducer = combineReducers({
  user,
  post,
});

export default persistReducer(persistConfig, rootReducer);
