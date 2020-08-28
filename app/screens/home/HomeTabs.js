import React from 'react';
import {View, Dimensions, Platform} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {connect} from 'react-redux';
import _ from 'lodash';

import {CommonColors, CommonStyles} from '../../utils/CommonStyles';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';
import Header from '../../components/Header';
import Text from '../../components/Text';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import LabelComponent from '../../components/LabelComponent';
import ItemTab from './TabItem';

const Tab = createMaterialTopTabNavigator();

const Tabs = (props) => {
  const keys = props.data.map((item) => item.key);

  const getTitle = (title) => {
    return I18n.t(`HomeScreen.${title}`);
  };

  return (
    <Tab.Navigator
      initialLayout={{
        width: Dimensions.get('window').width,
      }}
      tabBarOptions={{
        tabStyle: {
          width: 'auto',
          marginHorizontal: scale(5),
        },
        scrollEnabled: true,
        activeTintColor: CommonColors.primaryText,
        inactiveTintColor: CommonColors.secondaryText,
        indicatorStyle: {
          backgroundColor: CommonColors.indicatorColor,
          height: 2,
        },
      }}>
      {keys.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item}
            options={{
              tabBarLabel: ({focused}) => (
                <LabelComponent
                  title={getTitle(item)}
                  focused={focused}
                  style={{
                    color: focused
                      ? CommonColors.indicatorColor
                      : CommonColors.hintTextColor,
                  }}
                />
              ),
            }}>
            {() => <ItemTab data={props.data[index]} />}
          </Tab.Screen>
        );
      })}
    </Tab.Navigator>
  );
};

const renderHeader = () => {
  return (
    <Header
      left={
        <Text style={[CommonStyles.headerTitle, styles.header]}>
          {I18n.t('common.appName')}
        </Text>
      }
    />
  );
};

function HomeTabs({navigation, value}) {
  const topics = _.get(value, 'topics', {});
  const arrTopics = _.map(topics, (val, key) => ({key, val}));
  const res1 = [];
  const res2 = [];
  arrTopics.map((item) => {
    if (item.key === 'hot_news') {
      res1.push(item);
    } else {
      if (item.key !== 'trend') {
        res2.push(item);
      }
    }
  });
  const data = res1.concat(res2);
  return (
    <View style={styles.container}>
      {renderHeader()}
      <Tabs data={data} />
    </View>
  );
}

export default connect((state) => ({
  value: state.topics,
}))(HomeTabs);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonColors.lightSeparator,
  },
  header: {
    fontFamily: Platform.OS === 'ios' ? 'IowanOldStyle-Bold' : 'serif',
    fontSize: '20@ms',
    fontWeight: 'bold',
  },
});
