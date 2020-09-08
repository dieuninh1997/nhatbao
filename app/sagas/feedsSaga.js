import {call, fork, put, take} from 'redux-saga/effects';
import * as actionTypes from '../actions/types';
import database from '@react-native-firebase/database';
import _ from 'lodash';
import Axios from 'axios';

async function loadAllFeeds() {
  return await Axios.get('https://newscard9497.herokuapp.com/metadata_cat');
}

function* fetchAllFeeds() {
  try {
    const response = yield call(loadAllFeeds);
    console.log('================================================');
    console.log('fetchAllFeeds', response);
    console.log('================================================');
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
