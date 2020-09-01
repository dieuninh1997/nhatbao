import React, {useEffect, useRef, useState} from 'react';
import {View, Animated, Dimensions, Platform, StyleSheet} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import _ from 'lodash';
import {connect} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import RNSplashScreen from 'react-native-splash-screen';

import AppPreferences from '../../utils/AppPreferences';
import * as actions from '../../actions';
import store from '../../store';
import I18n from '../../i18n/i18n';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import Text from '../../components/Text';
import {CommonColors} from '../../utils/CommonStyles';

async function initData(navigation, dataLoadingState, topics) {
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
        store.dispatch(actions.fetchAllTopics());
      } else {
        if (_.isEmpty(topics)) {
          store.dispatch(actions.fetchAllTopics());
        } else {
          // navigation.dispatch(
          //   CommonActions.reset({
          //     index: 1,
          //     routes: [{name: 'MainScreen'}],
          //   }),
          // );
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

function SplashScreen({navigation, dataLoadingState, topics}, props) {
  useEffect(() => {
    RNSplashScreen.hide();
    initData(navigation, dataLoadingState, topics)
      .then((r) => {})
      .catch();
  }, [topics, dataLoadingState, navigation]);

  useEffect(() => {
    Animated.timing(loadingProgress, {
      toValue: 1,
      duration: 3000,
    }).start();
  }, [loadingProgress]);

  const [loadingProgress, setLoadingProgress] = useState(new Animated.Value(0));

  const translateY = loadingProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-(height * 2), 0],
  });
  const translateX = loadingProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-(height * 2), 0],
  });

  return (
    <View style={styles.screenContainer}>
      {/* <Animated.Image
        source={require('../../../assets/images/asia.png')}
        style={[styles.logoStyle, imageScale]}
        resizeMode="contain"
      /> */}

      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {transform: [{translateX}, {translateY}]},
          styles.cirlce,
        ]}
      />
      <Text style={styles.appName}>{I18n.t('common.appName')}</Text>
    </View>
  );
}

export default connect((state) => ({
  dataLoadingState: state.loading.dataLoadingState,
  topics: state.topics,
}))(SplashScreen);

const {width, height} = Dimensions.get('window');

const styles = ScaledSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cirlce: {
    width: height,
    height,
    borderRadius: height / 2,
    backgroundColor: '#c9340a',
  },
  appName: {
    fontSize: '44@ms',
    fontFamily: Platform.OS === 'ios' ? 'IowanOldStyle-Bold' : 'serif',
    fontWeight: 'bold',
    color: '#FFF',
  },
});
