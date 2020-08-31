import {all} from 'redux-saga/effects';
import {watchFetchAllFeeds} from './feedsSaga';
import {watchFetchAllTopics} from './topicSaga';
import {watchChangeLanguage} from './userSaga';
import {watchFetchAllDomain} from './domainSaga';

export default function* rootSaga() {
  yield all([
    watchFetchAllFeeds(),
    watchFetchAllTopics(),
    watchChangeLanguage(),
    watchFetchAllDomain(),
  ]);
}
