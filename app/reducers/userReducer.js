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
      console.log('================================================');
      console.log('UPDATE_GENDER -> action', action);
      console.log('================================================');
      return {
        ...state,
        gender: action.payload,
      };
    default:
      return state;
  }
}
