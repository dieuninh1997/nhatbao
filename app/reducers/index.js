import {combineReducers} from 'redux';
import loadingReducer from './loadingReducer';
import feedsReducer from './feedsReducer';
import netInfoReducer from './netInfoReducer';
import topicsReducer from './topicsReducer';

export default combineReducers({
  loading: loadingReducer,
  feeds: feedsReducer,
  netInfo: netInfoReducer,
  topics: topicsReducer,
});
