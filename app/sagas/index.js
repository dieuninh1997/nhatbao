import {all} from 'redux-saga/effects';
import {watchFetchAllFeeds} from './feedsSaga';

export default function* rootSaga() {
  yield all([watchFetchAllFeeds()]);
}
