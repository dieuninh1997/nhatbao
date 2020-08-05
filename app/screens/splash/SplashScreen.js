import React, {useEffect} from 'react';
import {View} from 'react-native';
import {CommonActions} from '@react-navigation/native';

async function initData(navigation, isDataLoading) {
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: 'MainScreen'}],
    }),
  );
}

function SplashScreen({navigation, isDataLoading}, props) {
  useEffect(() => {
    initData(navigation, isDataLoading)
      .then((r) => {})
      .catch();
  }, [isDataLoading, navigation]);
  return <View />;
}

export default SplashScreen;
