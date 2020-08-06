import {combineReducers} from 'redux';
import loadingReducer from './loadingReducer';
import feedsReducer from './feedsReducer';

export default combineReducers({
  loading: loadingReducer,
  feeds: feedsReducer,
});
