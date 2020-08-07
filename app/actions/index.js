import * as actionTypes from './types';

export const fetchBooks = () => ({type: actionTypes.FETCH_BOOKS});

export const showLoading = () => ({type: actionTypes.SHOW_LOADING});

export const hideLoading = () => ({type: actionTypes.HIDE_LOADING});

export const fetchAllFeeds = () => ({type: actionTypes.FETCH_ALL_FEEDS});

export const changeNetInfo = (params) => {
  return {type: actionTypes.CHANGE_NET_INFO, payload: params};
};
