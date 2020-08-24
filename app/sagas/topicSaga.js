import {call, fork, put, take} from 'redux-saga/effects';
import * as actionTypes from '../actions/types';
import database from '@react-native-firebase/database';
import _ from 'lodash';

async function loadAllTopics() {
  const ref = database().ref('/public_resource/topics');
  if (ref) {
    const data = await ref.once('value');
    const res = data.val();

    for (let key in res) {
      let item = res[key];
      res[key] = _.values(item).sort((a, b) => {
        return b.timestamp - a.timestamp;
      });
    }
    return res;
  } else {
    return [];
  }
}

function* fetchAllTopics() {
  try {
    const response = yield call(loadAllTopics);
    if (response) {
      yield put({
        type: actionTypes.FETCH_ALL_TOPICS_SUCCESS,
        payload: {
          topics: response,
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
