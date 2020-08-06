import React, {useEffect} from 'react';
import {View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import _ from 'lodash';
import {connect} from 'react-redux';

import * as actions from '../../actions';
import store from '../../store';

async function initData(navigation, dataLoadingState, feeds) {
  if (!dataLoadingState) {
    store.dispatch(actions.fetchAllFeeds());
  } else {
    if (_.isEmpty(feeds)) {
      store.dispatch(actions.fetchAllFeeds());
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'MainScreen'}],
        }),
      );
    }
  }
}

function SplashScreen({navigation, dataLoadingState, feeds}, props) {
  useEffect(() => {
    initData(navigation, dataLoadingState, feeds)
      .then((r) => {})
      .catch();
  }, [feeds, dataLoadingState, navigation]);

  return <View />;
}

export default connect((state) => ({
  dataLoadingState: state.loading.dataLoadingState,
  feeds: state.feeds,
}))(SplashScreen);
