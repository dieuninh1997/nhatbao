import {call, fork, put, take} from 'redux-saga/effects';
import * as actionTypes from '../actions/types';
import database from '@react-native-firebase/database';

async function loadAllDomain() {
  const ref = database().ref('/public_resource/domain');
  if (ref) {
    const data = await ref.once('value');
    return data.val();
  } else {
    return [];
  }
}

function* fetchAllDomain() {
  try {
    const response = yield call(loadAllDomain);
    if (response) {
      yield put({
        type: actionTypes.FETCH_ALL_DOMAIN_SUCCESS,
        payload: {
          domain: response,
        },
      });
    }
  } catch (err) {
    console.warn('Fetch all domain error', err);
  }
}

export function* watchFetchAllDomain() {
  while (yield take(actionTypes.FETCH_ALL_DOMAIN)) {
    yield fork(fetchAllDomain);
  }
}
