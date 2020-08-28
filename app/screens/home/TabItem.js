import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import FlipPage, {FlipPagePage} from 'react-native-flip-page';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';

import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import {CommonColors, Shadows, Fonts} from '../../utils/CommonStyles';
import FastImage from 'react-native-fast-image';
import Text from '.././../components/Text';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';
import ArrowIcon from '../../../assets/svg/ic_arrow_next.svg';
import {getDiffHours} from '../../utils/Filter';
import I18n from '../../i18n/i18n';

function TabItem(props) {
  const {data, value} = props;
  const navigation = useNavigation();
  const topics = _.get(value, 'topics', {});
  const trend = topics?.trend;
  const top3FirstTrend = trend.slice(0, 3);
  const top3FirstNew = data?.val.slice(0, 3);
  top3FirstNew.push('see_more');
  const topFirstNew = data?.val[0];
  const isHotNewTab = data?.key === 'hot_news';

  const secNew = [];
  data?.val.map((eData, index) => {
    if (index > 0 && index < 4) {
      secNew.push(eData);
    }
  });

  const renderTrendHeader = () => (
    <View style={styles.trendHeader}>
      <Text style={styles.trendTitle}>{I18n.t('HomeScreen.trend')}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('HomeItem', {
            value: {
              headerTitle: I18n.t('HomeScreen.trend'),
              data: trend,
            },
          });
        }}>
        <Text style={styles.btnName}>{I18n.t('HomeScreen.viewMore')}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({item, index}) => {
    if (index === 3) {
      return (
        <TouchableOpacity
          style={styles.btnSeeMore}
          onPress={() => {
            navigation.navigate('HomeItem', {
              value: {
                headerTitle: I18n.t(`HomeScreen.${data.key}`),
                data: data.val,
              },
            });
          }}>
          <Text style={styles.seeMoreText}>
            {I18n.t('HomeScreen.viewMore')}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('WebviewScreen', {linkUrl: item.link});
        }}>
        <View
          style={[styles.card, index === 0 ? {marginRight: scale(40)} : null]}>
          <View style={styles.imageContainer}>
            <FastImage
              source={{uri: item.image}}
              style={styles.image}
              resizeMode={FastImage.resizeMode.cover}
            />
            {index === 0 && (
              <TouchableWithoutFeedback onPress={() => {}}>
                <View style={styles.btnNext}>
                  <ArrowIcon
                    width={15}
                    height={15}
                    color={CommonColors.indicatorColor}
                  />
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>

          <View style={styles.topContent}>
            <Text style={styles.topTitle}>{item.title}</Text>
            <Text style={styles.domainTitle}>{item.domain}</Text>
            <Text style={styles.subtitle}>{getDiffHours(item.timestamp)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTabOther = () => (
    <View style={styles.tabContent}>
      <View>
        <FastImage
          source={{uri: topFirstNew.image}}
          style={styles.tabTopImage}
          resizeMode={FastImage.resizeMode.cover}
        />
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          colors={[
            'rgba(0, 0, 0, 0.8)',
            'rgba(0, 0, 0, 0.2)',
            'rgba(238, 238, 238, 0.1)',
          ]}
          style={styles.gradientView}
        />
        <View style={styles.tabTopTitleContainer}>
          <Text style={styles.tabTopTitle}>{topFirstNew.title}</Text>
          <Text style={styles.tabTopDomain}>{topFirstNew.domain}</Text>
          <Text style={styles.tabTopTime}>
            {getDiffHours(topFirstNew.timestamp)}
          </Text>
        </View>
      </View>
      {secNew.map((it, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate('WebviewScreen', {linkUrl: it.link});
            }}>
            <View style={styles.itContainer} key={index}>
              <View style={styles.itContent}>
                <Text style={styles.itTitle}>{it.title}</Text>
                <Text style={styles.secDomainText}>{it.domain}</Text>
                <Text style={styles.secTime}>{getDiffHours(it.timestamp)}</Text>
              </View>
              <FastImage
                style={styles.itImage}
                source={{uri: it.image}}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('HomeItem', {
            value: {
              headerTitle: I18n.t(`HomeScreen.${data.key}`),
              data: data.val,
            },
          });
        }}
        style={styles.btnMore}>
        <Text style={styles.btnName}>{I18n.t('HomeScreen.more')}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderTabHotNews = () => (
    <View style={styles.container}>
      <View style={styles.topView}>
        <FlatList
          horizontal
          data={top3FirstNew}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.trendingView}>
        {renderTrendHeader()}
        {top3FirstTrend.map((etrend, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate('WebviewScreen', {linkUrl: etrend.link});
              }}>
              <View style={styles.secContainer} key={index}>
                <FastImage
                  style={styles.secImage}
                  source={{uri: etrend.image}}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <View style={styles.secContent}>
                  <Text style={styles.secTitle}>{etrend.title}</Text>
                  <Text style={styles.secDomainText}>{etrend.domain}</Text>
                  <Text style={styles.secTime}>
                    {getDiffHours(etrend.timestamp)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        {isHotNewTab ? renderTabHotNews() : renderTabOther()}
      </View>
    </ScrollView>
  );
}

export default connect((state) => ({
  value: state.topics,
}))(TabItem);

const {width, height} = Dimensions.get('window');

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topView: {
    backgroundColor: CommonColors.lightSeparator,
    paddingTop: 0,
    height: width * 0.7,
  },
  trendingView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  card: {
    width: width * 0.8,
    height: width * 0.6,
    backgroundColor: '#FFFFFF',
    borderRadius: '15@s',
    marginTop: '20@s',
    borderColor: '#F8F8F8',
    borderWidth: '1@s',
    ...Shadows.shadowCard,
    marginRight: '20@s',
    marginLeft: '30@s',
  },
  tabContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: '16@s',
  },
  tabTopImage: {
    height: '200@s',
    width: '100%',
    borderRadius: 8,
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  topContent: {
    flex: 1,
    padding: '16@s',
  },
  btnNext: {
    width: '40@s',
    height: '40@s',
    borderRadius: '20@s',
    backgroundColor: '#FFF',
    position: 'absolute',
    right: -20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  subtitle: {
    marginTop: 6,
    color: '#424949',
    fontSize: 12,
    fontStyle: 'italic',
  },
  domainTitle: {
    marginTop: 6,
    color: CommonColors.indicatorColor,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  trendHeader: {
    flexDirection: 'row',
    height: '45@s',
    alignItems: 'center',
    marginTop: '6@s',
  },
  trendTitle: {
    flex: 1,
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  button: {
    width: '80@s',
    height: '30@s',
    backgroundColor: CommonColors.lightBgColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '25@s',
  },
  btnName: {
    fontSize: '12@ms',
    color: CommonColors.mainText,
    ...Fonts.defaultRegular,
  },
  secImage: {
    height: '80@s',
    width: '100@s',
    backgroundColor: '#dddeef',
    borderRadius: '10@s',
  },
  secContainer: {
    flexDirection: 'row',
    marginTop: '20@s',
  },
  secContent: {
    flex: 1,
    flexWrap: 'nowrap',
    marginLeft: '10@s',
  },
  secTitle: {
    color: '#000',
    fontSize: 13,
  },
  secTime: {
    fontSize: '12@ms',
    color: '#424949',
    ...Fonts.defaultRegular,
  },
  secDomainText: {
    fontSize: '12@ms',
    color: CommonColors.indicatorColor,
    ...Fonts.defaultRegular,
    textTransform: 'uppercase',
    marginTop: '7@s',
  },
  btnSeeMore: {
    alignSelf: 'center',
    marginRight: '20@s',
  },
  seeMoreText: {
    fontSize: '14@ms',
    color: CommonColors.mainText,
    ...Fonts.defaultRegular,
  },
  gradientView: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  tabTopTitleContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1000,
    padding: '15@s',
  },
  tabTopTitle: {
    fontSize: '14@s',
    color: '#FFF',
    ...Fonts.defaultBold,
    flexWrap: 'wrap',
  },
  tabTopTime: {
    fontSize: '12@s',
    color: CommonColors.lightText,
    fontStyle: 'italic',
  },
  tabTopDomain: {
    fontSize: '12@s',
    color: CommonColors.indicatorColor,
    textTransform: 'uppercase',
    width: 'auto',
  },
  itContainer: {
    flexDirection: 'row',
    marginTop: '25@s',
  },
  itImage: {
    height: '100@s',
    width: '100@s',
    backgroundColor: '#dddeef',
    borderRadius: '10@s',
  },
  itContent: {
    flex: 1,
    flexWrap: 'nowrap',
    marginRight: '10@s',
    marginTop: '10@s',
  },
  itTitle: {
    color: '#000',
    fontSize: 14,
  },
  btnMore: {
    height: '35@s',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CommonColors.lightBgColor,
    marginTop: '25@s',
    borderRadius: '25@s',
  },
});
