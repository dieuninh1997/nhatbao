import {call, fork, put, take} from 'redux-saga/effects';
import * as actionTypes from '../actions/types';
import Axios from 'axios';

async function loadAllDomain() {
  return await Axios.get('https://newscard9497.herokuapp.com/metadata_domain');
}

function* fetchAllDomain() {
  try {
    const response = yield call(loadAllDomain);
    if (response) {
      const data = response?.data?.result;
      yield put({
        type: actionTypes.FETCH_ALL_DOMAIN_SUCCESS,
        payload: {
          domain: data,
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
