import * as actions from '../actions/types';

const initialState = {
  isConnected: true,
};

export default function (state = initialState, action) {
  const {payload} = action;
  switch (action.type) {
    case actions.CHANGE_NET_INFO:
      return {...state, isConnected: payload};
    default:
      return state;
  }
}
