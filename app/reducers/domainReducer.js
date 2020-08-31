import {FETCH_ALL_DOMAIN_SUCCESS} from '../actions/types';

const initialState = {
  domain: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_DOMAIN_SUCCESS:
      return {
        ...state,
        domain: action.payload.domain,
      };
    default:
      return state;
  }
}
