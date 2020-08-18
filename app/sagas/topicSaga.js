import {call, fork, put, take} from 'redux-saga/effects';
import * as actionTypes from '../actions/types';
import database from '@react-native-firebase/database';

async function loadAllTopics() {
  let ref = database().ref('/public_resource/topics').orderByValue('timestamp');
  if (ref) {
    let data = await ref.once('value');
    return data.val();
  } else {
    return {};
  }
}

function* fetchAllTopics() {
  try {
    const response = yield call(loadAllTopics);
    console.log('================================================');
    console.log('response topics', response);
    console.log('================================================');
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
