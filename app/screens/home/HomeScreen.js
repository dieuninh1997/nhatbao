import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import Text from '../../components/Text';
import Header from '../../components/Header';
import {CommonStyles, CommonColors} from '../../utils/CommonStyles';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ForYouTab from './tabs/ForYouTab';
import TodayTab from './tabs/TodayTab';
import DailyEditionTab from './tabs/DailyEditionTab';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';

const Tab = createMaterialTopTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialLayout={{
        width: Dimensions.get('window').width,
      }}
      tabBarOptions={{
        scrollEnabled: true,
        activeTintColor: CommonColors.primaryText,
      }}>
      <Tab.Screen
        name="ForYou"
        component={ForYouTab}
        options={{
          width: scale(30),
        }}
      />
      <Tab.Screen name="Today" component={TodayTab} />
      <Tab.Screen name="DailyEditionTab" component={DailyEditionTab} />
    </Tab.Navigator>
  );
};

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      {/* <Header
        center={
          <Text style={CommonStyles.headerTitle}>
            {I18n.t('HomeScreen.header')}
          </Text>
        }
      /> */}
      <Header />
      <HomeTabs />
    </View>
  );
}

export default HomeScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
});
