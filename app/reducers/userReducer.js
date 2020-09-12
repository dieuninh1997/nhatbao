import {UPDATE_LANGUAGE, UPDATE_GENDER} from '../actions/types';

const initialState = {
  profile: {},
  language: 'en',
  gender: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case UPDATE_GENDER:
      return {
        ...state,
        gender: action.payload,
      };
    default:
      return state;
  }
}
