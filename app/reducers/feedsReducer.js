import {FETCH_ALL_FEEDS_SUCCESS} from '../actions/types';

const initialState = {
  feeds: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_FEEDS_SUCCESS:
      return {
        ...state,
        feeds: action.payload.feeds,
      };
    default:
      return state;
  }
}
