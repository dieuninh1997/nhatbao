import {all} from 'redux-saga/effects';
import {watchFetchAllFeeds} from './feedsSaga';
import {watchFetchAllTopics} from './topicSaga';

export default function* rootSaga() {
  yield all([watchFetchAllFeeds(), watchFetchAllTopics()]);
}
