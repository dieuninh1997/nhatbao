import {call, fork, put, take} from 'redux-saga/effects';
import * as actionTypes from '../actions/types';
import database from '@react-native-firebase/database';
import _ from 'lodash';

async function loadHotNews() {
  let ref = database().ref('/public_resource/topics/hot_news');
  if (ref) {
    let data = await ref.once('value');
    return data.val();
  } else {
    return {};
  }
}

async function loadFilm() {
  let ref = database().ref('/public_resource/topics/film');
  if (ref) {
    let data = await ref.once('value');
    return data.val();
  } else {
    return {};
  }
}

async function loadGold() {
  let ref = database().ref('/public_resource/topics/gold');
  if (ref) {
    let data = await ref.once('value');
    return data.val();
  } else {
    return {};
  }
}

async function loadAllTopics() {
  const res = await Promise.all([loadFilm(), loadGold(), loadHotNews()]);
  const response = {};
  if (res[0]) {
    response.film = _.values(res[0]).sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
  }
  if (res[1]) {
    response.gold = _.values(res[1]).sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
  }
  if (res[2]) {
    response.hot_news = _.values(res[2]).sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
  }
  return response;
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
