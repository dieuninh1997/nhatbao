import React, {useEffect} from 'react';
import {View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import _ from 'lodash';
import {connect} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import AppPreferences from '../../utils/AppPreferences';
import * as actions from '../../actions';
import store from '../../store';
import I18n from '../../i18n/i18n';

async function initData(navigation, dataLoadingState, feeds, topics, domain) {
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
        store.dispatch(actions.fetchAllFeeds());
        store.dispatch(actions.fetchAllTopics());
        store.dispatch(actions.fetchAllDomain());
      } else {
        if (_.isEmpty(feeds) || _.isEmpty(topics) || _.isEmpty(domain)) {
          store.dispatch(actions.fetchAllFeeds());
          store.dispatch(actions.fetchAllTopics());
          store.dispatch(actions.fetchAllDomain());
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
    AppPreferences.getLocale().then((locale) => {
      if (!locale) {
        locale = 'vn';
      }
      I18n.locale = locale;
      store.dispatch(actions.changeLanguage(locale));
    });
    store.dispatch(actions.changeNetInfo(isConnected));
  });
}

function SplashScreen(
  {navigation, dataLoadingState, feeds, topics, domain},
  props,
) {
  useEffect(() => {
    initData(navigation, dataLoadingState, feeds, topics, domain)
      .then((r) => {})
      .catch();
  }, [feeds, topics, domain, dataLoadingState, navigation]);

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
  topics: state.topics,
  domain: state.domain,
}))(SplashScreen);
