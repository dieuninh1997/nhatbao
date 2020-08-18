import {
  HIDE_LOADING,
  SHOW_LOADING,
  DATA_LOADING,
  FETCH_ALL_FEEDS_SUCCESS,
  FETCH_ALL_TOPICS_SUCCESS,
} from '../actions/types';

const initialState = {
  loading: false,
  dataLoadingState: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADING:
      return {loading: true};
    case HIDE_LOADING:
      return {loading: false};
    case DATA_LOADING:
    case FETCH_ALL_FEEDS_SUCCESS:
    case FETCH_ALL_TOPICS_SUCCESS:
      return {dataLoadingState: true};
    default:
      return state;
  }
}
