import React from 'react';
import {View, TouchableWithoutFeedback, Dimensions} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Text from '../../components/Text';
import Header from '../../components/Header';
import {CommonStyles, CommonColors, CommonSize} from '../../utils/CommonStyles';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import SearchIcon from '../../../assets/svg/ic_search.svg';
import {moderateScale, scale} from '../../libs/reactSizeMatter/scalingUtils';
import LabelComponent from '../../components/LabelComponent';
import ItemTab from './tabs/ItemTab';
import {connect} from 'react-redux';
import _ from 'lodash';

const Tab = createMaterialTopTabNavigator();

const ExploreTabs = (props) => {
  const keys = Object.keys(props.data);

  return (
    <Tab.Navigator
      initialLayout={{
        width: Dimensions.get('window').width,
      }}
      tabBarOptions={{
        style: {
          marginTop: scale(5),
        },
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
                  title={item.toUpperCase()}
                  focused={focused}
                  style={{
                    color: focused
                      ? CommonColors.indicatorColor
                      : CommonColors.hintTextColor,
                  }}
                />
              ),
            }}>
            {() => <ItemTab data={props.data[item]} />}
          </Tab.Screen>
        );
      })}
    </Tab.Navigator>
  );
};

function ExploreScreen({navigation, value}) {
  const feeds = _.get(value, 'feeds', {});
  return (
    <View style={styles.container}>
      <Header
        left={
          <Text style={[CommonStyles.headerTitle, styles.header]}>
            {I18n.t('ExploreScreen.header')}
          </Text>
        }
      />
      {/* Search */}
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={[styles.row, styles.searchContainer]}>
          <SearchIcon color={CommonColors.hintColor} width={20} height={20} />
          <Text style={styles.textInput}>
            {I18n.t('ExploreScreen.hintSearch')}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {/* tabs */}
      <ExploreTabs data={feeds} />
    </View>
  );
}

export default connect((state) => ({
  value: state.feeds,
}))(ExploreScreen);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonColors.bgColor,
  },
  header: {
    textTransform: 'uppercase',
    color: CommonColors.primaryText,
  },
  row: {
    flexDirection: 'row',
  },
  searchContainer: {
    backgroundColor: CommonColors.lightBgColor,
    height: '45@s',
    alignItems: 'center',
    paddingHorizontal: '10@s',
    marginHorizontal: '16@s',
    borderRadius: '3@s',
  },
  textInput: {
    fontSize: moderateScale(16),
    color: CommonColors.hintTextColor,
    marginLeft: '10@s',
  },
  space: {
    marginBottom: '20@s',
  },
});
