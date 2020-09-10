import {all} from 'redux-saga/effects';
import {watchFetchAllFeeds} from './feedsSaga';
import {watchFetchAllTopics} from './topicSaga';
import {watchChangeLanguage, watchChooseGender} from './userSaga';
import {watchFetchAllDomain} from './domainSaga';
import {watchFetchAllCluster} from './clusterSaga';

export default function* rootSaga() {
  yield all([
    watchFetchAllFeeds(),
    watchFetchAllTopics(),
    watchChangeLanguage(),
    watchChooseGender(),
    watchFetchAllDomain(),
    watchFetchAllCluster(),
  ]);
}
