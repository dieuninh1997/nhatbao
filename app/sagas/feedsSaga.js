import {call, fork, put, take} from 'redux-saga/effects';
import * as actionTypes from '../actions/types';
import Axios from 'axios';

async function loadAllFeeds() {
  return await Axios.get('https://newscard9497.herokuapp.com/metadata_cat');
}

function* fetchAllFeeds() {
  try {
    const response = yield call(loadAllFeeds);
    if (response) {
      const data = response?.data?.result;
      yield put({
        type: actionTypes.FETCH_ALL_FEEDS_SUCCESS,
        payload: {
          feeds: data,
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
