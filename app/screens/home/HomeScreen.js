import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import FastImage from 'react-native-fast-image';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Text from '../../components/Text';
import Header from '../../components/Header';
import {
  CommonStyles,
  CommonColors,
  CommonSize,
  Fonts,
} from '../../utils/CommonStyles';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import ForYouTab from './tabs/ForYouTab';
import TodayTab from './tabs/TodayTab';
import DailyEditionTab from './tabs/DailyEditionTab';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';
import LabelComponent from '../../components/LabelComponent';
import TabItem from './TabItem';
import {getDateTime, getDiffHours} from '../../utils/Filter';
import store from '../../store';
import * as actions from '../../actions';
import MoreIcon from '../../../assets/svg/ic_arrow_right.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

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

const renderTopics = (data, headerTitle) => {
  const arrData = _.map(data, (val, key) => ({key, val}));
  const firstData = arrData[0];
  const secondData = [];
  arrData.map((item, index) => {
    if (index > 0 && index < 4) {
      secondData.push(item);
    }
  });
  return (
    <View style={styles.itemTopicContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.topicHeaderTitle}>{headerTitle}</Text>
        <TouchableOpacity onPress={() => {}}>
          <MoreIcon width={15} height={15} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.topContent}>
        <FastImage
          style={styles.topImage}
          source={{uri: firstData.val.image}}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={styles.itemTime}>
          {getDateTime(firstData.val.timestamp)}
        </Text>
        <Text style={styles.itemTitle}>{firstData.val.title}</Text>
      </View>

      {secondData.length > 0 &&
        secondData.map((sec, index) => {
          const diffHours = getDiffHours(sec.val.timestamp);
          return (
            <View style={styles.secContainer} key={index}>
              <FastImage
                style={styles.secImage}
                source={{uri: sec.val.image}}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={styles.flexOne}>
                <Text style={styles.secTitle}>{sec.val.title}</Text>
                <Text style={styles.secTime}>
                  {diffHours > 24
                    ? getDateTime(sec.val.timestamp)
                    : `${diffHours} hours ago`}
                </Text>
              </View>
            </View>
          );
        })}
      <TouchableOpacity onPress={() => {}} style={styles.btnSeeMore}>
        <Text style={styles.btnName}>{I18n.t('HomeScreen.more')}</Text>
      </TouchableOpacity>
    </View>
  );
};

function HomeScreen({navigation, value}) {
  const [refreshing, setRefreshing] = useState(false);
  const _onRefresh = () => {
    setRefreshing(true);
    store.dispatch(actions.fetchAllTopics());
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };
  const topics = _.get(value, 'topics', {});
  const hotNews = topics.hot_news;
  const films = topics.film;
  const golds = topics.gold;
  return (
    <ScrollView
      scrollEnabled={true}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
      }>
      <View style={styles.container}>
        {/* <HomeTabs /> */}
        {renderHeader()}
        {renderTopics(hotNews, I18n.t('HomeScreen.hotNews'))}
        {renderTopics(films, I18n.t('HomeScreen.film'))}
        {renderTopics(golds, I18n.t('HomeScreen.golds'))}
      </View>
    </ScrollView>
  );
}
export default connect((state) => ({
  value: state.topics,
}))(HomeScreen);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonColors.lightSeparator,
  },
  flexOne: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  header: {
    textTransform: 'uppercase',
    color: CommonColors.primaryText,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTopicContainer: {
    backgroundColor: '#FFF',
    marginTop: '5@s',
    padding: '10@s',
  },
  topicHeaderTitle: {
    flex: 1,
    fontSize: '22@ms',
    color: CommonColors.indicatorColor,
    ...Fonts.defaultBold,
    marginVertical: '10@s',
  },
  topContent: {
    flex: 1,
  },
  topImage: {
    height: '300@s',
    width: '100%',
  },
  itemTitle: {
    fontSize: '18@ms',
    color: CommonColors.mainText,
    ...Fonts.defaultBold,
    marginVertical: '10@s',
  },
  itemTime: {
    fontSize: '16@ms',
    color: CommonColors.mainText,
    ...Fonts.defaultRegular,
    marginTop: '10@s',
  },
  secImage: {
    height: '80@s',
    width: '100@s',
  },
  secContainer: {
    flexDirection: 'row',
    marginTop: '20@s',
  },
  secTitle: {
    fontSize: '16@ms',
    color: CommonColors.mainText,
    ...Fonts.defaultRegular,
    marginLeft: '10@s',
  },
  secTime: {
    fontSize: '14@ms',
    color: CommonColors.mainText,
    ...Fonts.defaultRegular,
    marginLeft: '10@s',
    marginTop: '10@s',
  },
  btnSeeMore: {
    height: '45@s',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CommonColors.lightBgColor,
    marginTop: '20@s',
    borderRadius: '25@s',
  },
  btnName: {
    fontSize: '14@ms',
    color: CommonColors.mainText,
    ...Fonts.defaultRegular,
  },
});
