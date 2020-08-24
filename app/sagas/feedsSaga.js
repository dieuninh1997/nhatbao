import {call, fork, put, take} from 'redux-saga/effects';
import * as actionTypes from '../actions/types';
import database from '@react-native-firebase/database';
import _ from 'lodash';

async function loadAllFeeds() {
  const ref = database()
    .ref('/public_resource/feeds')
    .orderByValue('timestamp');
  if (ref) {
    const data = await ref.once('value');
    const res = data.val();

    for (let key in res) {
      let item = res[key];
      res[key] = _.values(item);
    }
    return res;
  } else {
    return [];
  }
}

function* fetchAllFeeds() {
  try {
    const response = yield call(loadAllFeeds);
    if (response) {
      yield put({
        type: actionTypes.FETCH_ALL_FEEDS_SUCCESS,
        payload: {
          feeds: response,
        },
      });
    }
  } catch (err) {
    console.warn('Fetch all feeds error', err);
  }
}

export function* watchFetchAllFeeds() {
  while (yield take(actionTypes.FETCH_ALL_FEEDS)) {
    yield fork(fetchAllFeeds);
  }
}
