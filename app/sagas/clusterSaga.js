import {call, fork, put, take} from 'redux-saga/effects';
import * as actionTypes from '../actions/types';
import Axios from 'axios';

async function loadAllCluster() {
  return await Axios.get('https://newscard9497.herokuapp.com/metadata_cluster');
}

function* fetchAllCluster() {
  try {
    const response = yield call(loadAllCluster);
    console.log('================================================');
    console.log('fetchAllCluster', response);
    console.log('================================================');
    if (response) {
      const data = response?.data?.result;
      yield put({
        type: actionTypes.FETCH_ALL_CLUSTER_SUCCESS,
        payload: {
          cluster: data,
        },
      });
    }
  } catch (err) {
    console.warn('Fetch all feeds error', err);
  }
}

export function* watchFetchAllCluster() {
  while (yield take(actionTypes.FETCH_ALL_CLUSTER)) {
    yield fork(fetchAllCluster);
  }
}
