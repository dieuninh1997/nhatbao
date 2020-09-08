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

function* _chooseGender(action) {
  try {
    yield put({type: actionTypes.UPDATE_GENDER, payload: action.params});
  } catch (err) {
    console.log('Choose gender error', err);
  }
}

export function* watchChooseGender() {
  yield takeLatest(actionTypes.CHOOSE_GENDER, _chooseGender);
}
