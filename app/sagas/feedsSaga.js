import {call, fork, put, take} from 'redux-saga/effects';
import * as actionTypes from '../actions/types';
import database from '@react-native-firebase/database';

async function loadAllFeeds() {
  let ref = database().ref('/public_resource/feeds');
  if (ref) {
    let data = await ref.once('value');
    return data.val();
  } else {
    return {};
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
