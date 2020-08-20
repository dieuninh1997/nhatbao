import {UPDATE_LANGUAGE} from '../actions/types';

const initialState = {
  profile: {},
  language: 'en',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
}
