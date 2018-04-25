import { combineReducers } from 'redux';
import postReducer from './post';
import sessionReducer from './session';
import userReducer from './user';

const rootReducer = combineReducers({
  postState: postReducer,
  sessionState: sessionReducer,
  userState: userReducer,
});

export default rootReducer;