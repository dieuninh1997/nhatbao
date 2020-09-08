import React, {useEffect, useState} from 'react';
import {View, Animated, Dimensions, Platform} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import {connect, useSelector} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import RNSplashScreen from 'react-native-splash-screen';

import AppPreferences from '../../utils/AppPreferences';
import * as actions from '../../actions';
import store from '../../store';
import I18n from '../../i18n/i18n';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import Text from '../../components/Text';
import PopupGender from '../../components/PopupGender';
import {CommonColors} from '../../utils/CommonStyles';

export default (props) => {
  const gender = useSelector((state) => state.user.gender);
  const dataLoadingState = useSelector(
    (state) => state.loading.dataLoadingState,
  );
  const topics = useSelector((state) => state.topics);
  const navigation = useNavigation();
  const [showPopup, setShowPopup] = useState(false);

  console.log('================================================');
  console.log('gender', gender);
  console.log('================================================');

  useEffect(() => {
    RNSplashScreen.hide();
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

      AppPreferences.getGender().then((_gender) => {
        if (_gender) {
          store.dispatch(actions.chooseGender(_gender));
        }
      });

      store.dispatch(actions.changeNetInfo(isConnected));
    });
  }, [dataLoadingState, gender, navigation, topics]);

  useEffect(() => {
    setTimeout(() => {
      setShowPopup(true);
    }, 100);
  }, []);

  if (!_.isEmpty(topics) && gender) {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'MainScreen'}],
      }),
    );
  }

  return (
    <View style={styles.screenContainer}>
      {!gender && showPopup ? (
        <PopupGender
          moveTo={() =>
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'MainScreen'}],
              }),
            )
          }
        />
      ) : null}
      {!showPopup ? (
        <Text style={styles.appName}>{I18n.t('common.appName')}</Text>
      ) : null}
    </View>
  );
};

const styles = ScaledSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CommonColors.activeTintColor,
  },
  appName: {
    fontSize: '44@ms',
    fontFamily: Platform.OS === 'ios' ? 'IowanOldStyle-Bold' : 'serif',
    fontWeight: 'bold',
    color: '#FFF',
  },
});
