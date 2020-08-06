import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import Text from '../../components/Text';
import Header from '../../components/Header';
import {CommonStyles, CommonColors, CommonSize} from '../../utils/CommonStyles';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ForYouTab from './tabs/ForYouTab';
import TodayTab from './tabs/TodayTab';
import DailyEditionTab from './tabs/DailyEditionTab';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';
import LabelComponent from '../../components/LabelComponent';

const Tab = createMaterialTopTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialLayout={{
        width: Dimensions.get('window').width,
      }}
      tabBarOptions={{
        style: {
          marginTop: CommonSize.paddingTopHeader,
        },
        scrollEnabled: true,
        activeTintColor: CommonColors.primaryText,
        inactiveTintColor: CommonColors.secondaryText,
        indicatorStyle: {
          backgroundColor: CommonColors.indicatorColor,
          height: 2,
        },
      }}>
      <Tab.Screen
        name="ForYou"
        component={ForYouTab}
        options={{
          tabBarLabel: ({focused}) => (
            <LabelComponent
              title="FOR YOU"
              focused={focused}
              style={{
                color: focused
                  ? CommonColors.primaryText
                  : CommonColors.secondaryText,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Today"
        component={TodayTab}
        options={{
          tabBarLabel: ({focused}) => (
            <LabelComponent
              title="TODAY"
              focused={focused}
              style={{
                color: focused
                  ? CommonColors.primaryText
                  : CommonColors.secondaryText,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="DailyEditionTab"
        component={DailyEditionTab}
        options={{
          tabBarLabel: ({focused}) => (
            <LabelComponent
              title="DAILY EDITION"
              focused={focused}
              style={{
                color: focused
                  ? CommonColors.primaryText
                  : CommonColors.secondaryText,
              }}
            />
          ),
        }}
      />
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
