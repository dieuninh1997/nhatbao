import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Platform} from 'react-native';

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
import TabItem from './TabItem';
import {connect} from 'react-redux';
import _ from 'lodash';

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
        tabStyle: {
          width: 'auto',
          marginHorizontal: scale(5),
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

// const HomeTabs = (props) => {
//   const keys = Object.keys(props.data);

//   return (
//     <Tab.Navigator
//       initialLayout={{
//         width: Dimensions.get('window').width,
//       }}
//       tabBarOptions={{
//         style: {
//           marginTop: CommonSize.paddingTopHeader,
//         },
//         tabStyle: {
//           width: 'auto',
//           marginHorizontal: scale(5),
//         },
//         scrollEnabled: true,
//         activeTintColor: CommonColors.primaryText,
//         inactiveTintColor: CommonColors.secondaryText,
//         indicatorStyle: {
//           backgroundColor: CommonColors.indicatorColor,
//           height: 2,
//         },
//       }}>
//       {keys.map((item, index) => {
//         return (
//           <Tab.Screen
//             key={index}
//             name={item}
//             options={{
//               tabBarLabel: ({focused}) => (
//                 <LabelComponent
//                   title={item.toUpperCase()}
//                   focused={focused}
//                   style={{
//                     color: focused
//                       ? CommonColors.indicatorColor
//                       : CommonColors.hintTextColor,
//                   }}
//                 />
//               ),
//             }}>
//             {() => <TabItem data={props.data[item]} />}
//           </Tab.Screen>
//         );
//       })}
//     </Tab.Navigator>
//   );
// };

function HomeScreen({navigation, value}) {
  return (
    <View style={styles.container}>
      <HomeTabs />
    </View>
  );
}
export default connect((state) => ({
  value: state.feeds,
}))(HomeScreen);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
});
