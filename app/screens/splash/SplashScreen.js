import React, {useEffect} from 'react';
import {View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import _ from 'lodash';
import {connect} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

import * as actions from '../../actions';
import store from '../../store';

async function initData(navigation, dataLoadingState, feeds) {
  //check internet
  NetInfo.fetch().then((state) => {
    store.dispatch(actions.changeNetInfo(state.isConnected));
  });

  NetInfo.addEventListener(async (state) => {
    const isConnected =
      state.type === 'none' || state.type === 'unknown' ? false : true;
    if (!isConnected) {
      // Utils.showErrorToast({message: 'No internet'});
    } else {
      if (!dataLoadingState) {
        console.log('================================================');
        console.log('dataLoadingState', dataLoadingState);
        console.log('================================================');
        store.dispatch(actions.fetchAllFeeds());
      } else {
        if (_.isEmpty(feeds)) {
          console.log('================================================');
          console.log('feeds', feeds);
          console.log('================================================');
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
    store.dispatch(actions.changeNetInfo(isConnected));
  });
}

function SplashScreen({navigation, dataLoadingState, feeds}, props) {
  useEffect(() => {
    initData(navigation, dataLoadingState, feeds)
      .then((r) => {})
      .catch();
  }, [feeds, dataLoadingState, navigation]);

  return (
    <View style={{flex: 1, backgroundColor: 'rgb(100, 200, 300)'}}>
      {/* <Image
        resizeMode="cover"
        style={styles.logoStyle}
        source={require('../../assets/images/splash_screen/splash_screen.jpg')}
      /> */}
    </View>
  );
}

export default connect((state) => ({
  dataLoadingState: state.loading.dataLoadingState,
  feeds: state.feeds,
}))(SplashScreen);
