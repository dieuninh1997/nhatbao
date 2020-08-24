import React, {useState} from 'react';
import {
  View,
  Dimensions,
  Platform,
  ScrollView,
  RefreshControl,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import FastImage from 'react-native-fast-image';

import Text from '../../components/Text';
import Header from '../../components/Header';
import {CommonStyles, CommonColors, Fonts} from '../../utils/CommonStyles';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import {getDateTime, getDiffHours} from '../../utils/Filter';
import store from '../../store';
import * as actions from '../../actions';
import MoreIcon from '../../../assets/svg/ic_more_arrow_right.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

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

const renderTopics = (data, headerTitle, navigation) => {
  if (!data || data.length === 0) {
    return null;
  }
  const firstData = data[0];
  const secondData = [];
  data.map((item, index) => {
    if (index > 0 && index < 4) {
      secondData.push(item);
    }
  });
  return (
    <View style={styles.itemTopicContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.topicHeaderTitle}>{headerTitle}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('HomeItem', {value: {headerTitle, data}});
          }}>
          <MoreIcon width={15} height={15} color="#000" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('WebviewScreen', {linkUrl: firstData.link});
        }}>
        <View style={styles.topContent}>
          <FastImage
            style={styles.topImage}
            source={{uri: firstData.image}}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text style={styles.itemTime}>
            {getDiffHours(firstData.timestamp)}
          </Text>
          <Text style={styles.itemTitle}>{firstData.title}</Text>
        </View>
      </TouchableOpacity>

      {secondData.length > 0 &&
        secondData.map((sec, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate('WebviewScreen', {linkUrl: sec.link});
              }}>
              <View style={styles.secContainer} key={index}>
                <FastImage
                  style={styles.secImage}
                  source={{uri: sec.image}}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <View style={styles.flexOne}>
                  <Text style={styles.secTitle}>{sec.title}</Text>
                  <Text style={styles.secTime}>
                    {getDiffHours(sec.timestamp)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('HomeItem', {value: {headerTitle, data}});
        }}
        style={styles.btnSeeMore}>
        <Text style={styles.btnName}>{I18n.t('HomeScreen.more')}</Text>
      </TouchableOpacity>
    </View>
  );
};

function HomeScreen({navigation, value, language}) {
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
  const trend = topics.trend;
  console.log('================================================');
  console.log('topics', topics);
  console.log('================================================');

  return (
    <ScrollView
      scrollEnabled={true}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
      }>
      <View style={styles.container}>
        {/* <HomeTabs /> */}
        {renderHeader()}
        {renderTopics(hotNews, I18n.t('HomeScreen.hotNews'), navigation)}
        {renderTopics(films, I18n.t('HomeScreen.film'), navigation)}
        {renderTopics(golds, I18n.t('HomeScreen.golds'), navigation)}
        {renderTopics(trend, I18n.t('HomeScreen.trend'), navigation)}
      </View>
    </ScrollView>
  );
}
export default connect((state) => ({
  value: state.topics,
  language: state.user.language,
}))(HomeScreen);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonColors.lightSeparator,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
    fontSize: '16@ms',
    color: CommonColors.indicatorColor,
    ...Fonts.defaultBold,
    marginVertical: '6@s',
  },
  topContent: {
    flex: 1,
  },
  topImage: {
    height: '300@s',
    width: '100%',
  },
  itemTitle: {
    fontSize: '13@ms',
    color: CommonColors.mainText,
    ...Fonts.defaultBold,
    marginVertical: '6@s',
  },
  itemTime: {
    fontSize: '13@ms',
    color: CommonColors.mainText,
    ...Fonts.defaultRegular,
    marginTop: '6@s',
    fontStyle: 'italic',
  },
  secImage: {
    height: '80@s',
    width: '100@s',
    backgroundColor: '#dddeef',
  },
  secContainer: {
    flexDirection: 'row',
    marginTop: '10@s',
  },
  secTitle: {
    fontSize: '13@ms',
    color: CommonColors.mainText,
    marginLeft: '10@s',
    fontWeight: 'bold',
  },
  secTime: {
    fontSize: '12@ms',
    color: CommonColors.mainText,
    ...Fonts.defaultRegular,
    marginLeft: '10@s',
    marginTop: '6@s',
    fontStyle: 'italic',
  },
  btnSeeMore: {
    height: '35@s',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CommonColors.lightBgColor,
    marginTop: '10@s',
    borderRadius: '25@s',
  },
  btnName: {
    fontSize: '13@ms',
    color: CommonColors.mainText,
    ...Fonts.defaultRegular,
  },
});
