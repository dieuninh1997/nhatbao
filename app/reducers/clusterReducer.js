import {FETCH_ALL_CLUSTER_SUCCESS} from '../actions/types';

const initialState = {
  cluster: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_CLUSTER_SUCCESS:
      return {
        ...state,
        cluster: action.payload.cluster,
      };
    default:
      return state;
  }
}
