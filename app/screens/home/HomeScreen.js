import React, {useState} from 'react';
import {
  View,
  Dimensions,
  Platform,
  ScrollView,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
import LottieView from 'lottie-react-native';

import Text from '../../components/Text';
import Header from '../../components/Header';
import {
  CommonStyles,
  CommonColors,
  Fonts,
  Shadows,
} from '../../utils/CommonStyles';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import {getDiffHours} from '../../utils/Filter';
import store from '../../store';
import * as actions from '../../actions';
import ArrowIcon from '../../../assets/svg/ic_arrow_next.svg';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';
import {useNavigation} from '@react-navigation/native';

export default function HomeScreen(props) {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const topics = useSelector((state) => state.topics.topics);
  const keys = Object.keys(topics);
  const otherData = [];
  keys.map((key) => {
    if (key !== 'trend' && key !== 'hot_news') {
      otherData.push(key);
    }
  });

  const hotNews = topics?.hot_news;
  const trend = topics?.trend;
  const top3FirstTrend = trend?.slice(0, 3);
  const top3FirstNew = hotNews?.slice(0, 5);
  top3FirstNew?.push('see_more');

  const _onRefresh = () => {
    setRefreshing(true);
    store.dispatch(actions.fetchAllTopics());
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
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

  const renderTrendHeader = (title, data, style = {}) => (
    <View style={[styles.trendHeader, style]}>
      <Text style={styles.trendTitle}>{title}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('HomeItem', {
            value: {
              headerTitle: title,
              data,
            },
          });
        }}>
        <Text style={styles.btnName}>{I18n.t('HomeScreen.viewMore')}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({item, index}) => {
    if (index === 5) {
      return (
        <TouchableOpacity
          key={index}
          style={styles.btnSeeMore}
          onPress={() => {
            navigation.navigate('HomeItem', {
              value: {
                headerTitle: I18n.t('HomeScreen.hotNews'),
                data: 'hot_news',
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
        key={index}
        onPress={() => {
          navigation.navigate('WebviewScreen', {linkUrl: item.link});
        }}>
        <View style={styles.card}>
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
                    color={CommonColors.activeTintColor}
                  />
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>

          <View style={styles.topContent}>
            <Text style={styles.topTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.domainTitle}>{item.domain}</Text>
            <Text style={styles.subtitle}>{getDiffHours(item.timestamp)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHotNews = () => (
    <View style={styles.container}>
      {renderTrendHeader(I18n.t('HomeScreen.hotNews'), 'hot_news', {
        paddingHorizontal: scale(16),
        marginTop: 0,
      })}

      <View style={styles.topView}>
        <FlatList
          horizontal
          data={top3FirstNew}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${item.id}_${index}`}
        />
      </View>
      {top3FirstTrend ? (
        <View style={styles.trendingView}>
          {renderTrendHeader(I18n.t('HomeScreen.trend'), 'trend')}
          {top3FirstTrend?.map((etrend, index) => {
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
      ) : null}
    </View>
  );

  const renderTabOther = (first, sec, title, data) => (
    <View style={styles.tabContent}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('WebviewScreen', {linkUrl: first.link});
        }}>
        <View>
          <FastImage
            source={{uri: first.image}}
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
            <Text style={styles.tabTopTitle}>{first.title}</Text>
            <Text style={styles.tabTopDomain}>{first.domain}</Text>
            <Text style={styles.tabTopTime}>
              {getDiffHours(first.timestamp)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {sec?.map((it, index) => {
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
    </View>
  );

  const getSec = (othData) => {
    const sec = [];
    if (othData) {
      othData.map((eData, index) => {
        if (index > 0 && index < 4) {
          sec.push(eData);
        }
      });
    }
    return sec;
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {_.isEmpty(topics) ? (
        <View style={styles.loadingContainer}>
          <LottieView
            style={styles.loadingIcon}
            source={require('../../../assets/animations/row_loading.json')}
            autoPlay
            loop
          />
        </View>
      ) : (
        <ScrollView
          scrollEnabled={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
          }>
          {renderHotNews()}
          {otherData?.map((key, index) => {
            const othData = topics[`${key}`];
            const topFirst = othData && othData[0];
            const sec = getSec(othData);

            return (
              <View key={index}>
                {renderTrendHeader(I18n.t(`HomeScreen.${key}`), key, {
                  paddingHorizontal: scale(16),
                })}
                {renderTabOther(
                  topFirst,
                  sec,
                  othData,
                  key,
                  index % 2 !== 0
                    ? {
                        paddingHorizontal: scale(16),
                        marginTop: 0,
                      }
                    : {},
                )}
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const {width, height} = Dimensions.get('window');
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontFamily: Platform.OS === 'ios' ? 'IowanOldStyle-Bold' : 'serif',
    fontWeight: 'bold',
    color: '#000',
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
    width: width * 0.7,
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
    fontSize: '14@ms',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  subtitle: {
    marginTop: '6@s',
    color: '#424949',
    fontSize: '12@ms',
    fontStyle: 'italic',
  },
  domainTitle: {
    marginTop: '6@s',
    color: CommonColors.activeTintColor,
    fontSize: '12@ms',
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
    fontSize: '14@ms',
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
    marginTop: Platform.OS === 'ios' ? '20@s' : '14@s',
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
    color: CommonColors.activeTintColor,
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
    color: CommonColors.activeTintColor,
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
  loadingContainer: {
    flex: 1,
    marginTop: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIcon: {
    width: '100@s',
    height: '100@s',
    alignSelf: 'center',
  },
});
