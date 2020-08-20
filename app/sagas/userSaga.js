import {call, fork, put, take, takeLatest} from 'redux-saga/effects';
import * as actionTypes from '../actions/types';

function* _changeLanguage(action) {
  try {
    yield put({type: actionTypes.UPDATE_LANGUAGE, payload: action.params});
  } catch (err) {
    console.log('Change language Setting', err);
  }
}

export function* watchChangeLanguage() {
  yield takeLatest(actionTypes.CHANGE_LANGUAGE, _changeLanguage);
}
