import {call, fork, put, take} from 'redux-saga/effects';
import * as actionTypes from '../actions/types';
import Axios from 'axios';

async function loadAllCover() {
  return await Axios.get('https://newscard9497.herokuapp.com/metadata_cover');
}

function* fetchAllCover() {
  try {
    const response = yield call(loadAllCover);
    console.log('================================================');
    console.log('fetchAllCover', response);
    console.log('================================================');
    if (response) {
      const data = response?.data?.result;
      yield put({
        type: actionTypes.FETCH_ALL_COVER_SUCCESS,
        payload: {
          cover: data,
        },
      });
    }
  } catch (err) {
    console.warn('Fetch all feeds error', err);
  }
}

export function* watchFetchAllCover() {
  while (yield take(actionTypes.FETCH_ALL_COVER)) {
    yield fork(fetchAllCover);
  }
}
