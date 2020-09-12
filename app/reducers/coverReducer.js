import {FETCH_ALL_COVER_SUCCESS} from '../actions/types';

const initialState = {
  cover: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_COVER_SUCCESS:
      return {
        ...state,
        cover: action.payload.cover,
      };
    default:
      return state;
  }
}
