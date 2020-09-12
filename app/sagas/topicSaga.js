import {call, fork, put, take} from 'redux-saga/effects';
import * as actionTypes from '../actions/types';
import database from '@react-native-firebase/database';
import _ from 'lodash';
import axios from 'axios';

async function loadAllTopics() {
  return await axios.get('https://newscard9497.herokuapp.com/topics');
}

function* fetchAllTopics() {
  try {
    const response = yield call(loadAllTopics);
    if (response) {
      const data = response?.data?.result;
      yield put({
        type: actionTypes.FETCH_ALL_TOPICS_SUCCESS,
        payload: {
          topics: data,
        },
      });
    }
  } catch (err) {
    console.warn('Fetch all topics error', err);
  }
}

export function* watchFetchAllTopics() {
  while (yield take(actionTypes.FETCH_ALL_TOPICS)) {
    yield fork(fetchAllTopics);
  }
}
