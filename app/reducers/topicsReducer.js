import {FETCH_ALL_TOPICS_SUCCESS} from '../actions/types';

const initialState = {
  topics: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_TOPICS_SUCCESS:
      return {
        ...state,
        topics: action.payload.topics,
      };
    default:
      return state;
  }
}
