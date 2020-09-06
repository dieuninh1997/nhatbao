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

import storage from '@react-native-firebase/storage';


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
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, [loadingProgress]);

  const [url, setUrl] = useState(null);

  async function initData(navigation, dataLoadingState, topics) {
    const refUrl = await storage().ref("images/cover1.jpg").getDownloadURL();
    setUrl({uri: refUrl});

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


  const [loadingProgress, setLoadingProgress] = useState(new Animated.Value(0));

  const translateY = loadingProgress.interpolate({
    // inputRange: [0, 1],
    // outputRange: [-height, 0],
    inputRange: [0, 1],
    outputRange: [0.7, 1]
  });
  const translateX = loadingProgress.interpolate({
    // inputRange: [0, 1],
    // outputRange: [-height, 25],
    inputRange: [0, 1],
    outputRange: [0.7, 1]
  });

  const scaleX = loadingProgress.interpolate({
    inputRange: [15, 30],
    outputRange: [0.65, 0]
  });

  const scaleY = loadingProgress.interpolate({
    inputRange: [1, 1.5],
    outputRange: [1.55, 0]
  });
console.log('================================================');
console.log('url', url);
console.log('================================================');

  return (
    <View style={styles.screenContainer}>
    {/* <Animated.View
      style={[
        StyleSheet.absoluteFill,
        // styles.cirlce,
      ]}
    /> */}
    {url ? (
      <Animated.Image
        source={url}
        style={[
          {width, height}, 
          {transform: [
            // {translateX}, 
            // {translateY},
            {scaleX},
            {scaleY}
          ]}
        ]}
        resizeMode="contain"
      />
    ) : null}
      {/* <Text style={styles.appName}>{I18n.t('common.appName')}</Text> */}
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
  // cirlce: {
  //   width: height * 2,
  //   height: height * 2,
  //   borderRadius: height / 2,
  //   backgroundColor: '#c9340a',
  // },
  appName: {
    fontSize: '44@ms',
    fontFamily: Platform.OS === 'ios' ? 'IowanOldStyle-Bold' : 'serif',
    fontWeight: 'bold',
    color: '#FFF',
  },
});
