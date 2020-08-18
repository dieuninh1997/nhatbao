import React from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import FlipPage, {FlipPagePage} from 'react-native-flip-page';
import {connect} from 'react-redux';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import Text from '../../components/Text';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';
import {CommonColors, Fonts, CommonStyles} from '../../utils/CommonStyles';
import BackButton from '../../components/BackButton';
import Header from '../../components/Header';

const renderTopPage = (navigation, data) => {
  const topImg = data[0];
  const secondImg = data[1];
  const thirdImg = data[2];
  const topTags = topImg.val.detail_keywords;
  const secondTags =
    secondImg.val.detail_keywords && secondImg.val.detail_keywords[0];
  const thirdTags =
    thirdImg.val.detail_keywords && thirdImg.val.detail_keywords[0];

  return (
    <View style={styles.topPageContainer}>
      {/* top */}
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('WebviewScreen', {linkUrl: topImg.val.link});
        }}>
        <View style={styles.topView}>
          <FastImage
            style={styles.topImage}
            source={{uri: topImg.val.image}}
            resizeMode={FastImage.resizeMode.cover}
          />
          {/* tags */}
          <View style={[styles.row, styles.topTagContainer]}>
            {topTags &&
              topTags.length > 0 &&
              topTags.map((tag, index) => (
                <TouchableOpacity key={index} style={styles.topTag}>
                  <Text style={{color: '#FFF', fontSize: 14}}>
                    {tag.keyword}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={[
              'rgba(0, 0, 0, 0.8)',
              'rgba(0, 0, 0, 0.2)',
              'rgba(238, 238, 238, 0.1)',
            ]}
            style={styles.linearGradient}
          />
          <Text style={styles.topLabel} numberOfLines={3} ellipsizeMode="tail">
            {topImg.val.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={[styles.row, styles.flexOne]}>
        {/* left */}
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('WebviewScreen', {linkUrl: secondImg.val.link});
          }}>
          <View style={[styles.itemContainer, {paddingRight: 0}]}>
            <FastImage
              style={styles.image}
              resizeMode={FastImage.resizeMode.cover}
              source={{uri: secondImg.val.image}}
            />

            <Text style={styles.label} numberOfLines={3} ellipsizeMode="tail">
              {secondImg.val.title}
            </Text>
            {secondTags && (
              <TouchableOpacity style={[styles.topTag, styles.thirdTag]}>
                <Text
                  style={styles.thirdTagTitle}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {secondTags.keyword}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableWithoutFeedback>
        {/* right */}
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('WebviewScreen', {linkUrl: thirdImg.val.link});
          }}>
          <View style={styles.itemContainer}>
            <FastImage
              style={styles.image}
              resizeMode={FastImage.resizeMode.cover}
              source={{uri: thirdImg.val.image}}
            />
            <Text style={styles.label} numberOfLines={3} ellipsizeMode="tail">
              {thirdImg.val.title}
            </Text>
            {thirdTags && (
              <TouchableOpacity style={[styles.topTag, styles.thirdTag]}>
                <Text
                  style={styles.thirdTagTitle}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {thirdTags.keyword}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const renderHeader = (title) => {
  return (
    <Header
      left={<BackButton />}
      center={
        <Text style={[CommonStyles.headerTitle, styles.header]}>{title}</Text>
      }
    />
  );
};

const renderItemPage = (item, index) => {
  return (
    <FlipPagePage key={index}>
      <FastImage
        style={{width: '100%', height: '50%'}}
        source={{uri: item.val.image}}
        resizeMode={FastImage.resizeMode.cover}
      />

      <View style={styles.itemContent}>
        <Text style={styles.title}>{item.val.title}</Text>
        <View style={{flexDirection: 'row', marginTop: scale(10)}}>
          <Text
            style={{
              fontSize: scale(14),
              color: CommonColors.indicatorColor,
            }}>
            {item.val.domain.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.description}>{item.val.description}</Text>
      </View>
    </FlipPagePage>
  );
};

function FollowItem({navigation, route, value}) {
  const item = route?.params?.value;
  const feeds = _.get(value, 'feeds', {});
  const data = feeds[`${item}`];
  const arrData = _.map(data, (val, key) => ({key, val}));
  const topPage = arrData && arrData.length > 3 ? arrData.slice(0, 3) : [];
  let images = [];
  arrData.map((e, index) => {
    if (index > 2) {
      images.push(e);
    }
  });

  return (
    <View style={styles.container}>
      {renderHeader(item)}
      <FlipPage>
        {topPage.length > 0 && (
          <FlipPagePage>{renderTopPage(navigation, topPage)}</FlipPagePage>
        )}
        {images.map((_item, index) => renderItemPage(_item, index))}
      </FlipPage>
    </View>
  );
}

export default connect((state) => ({
  value: state.feeds,
}))(FollowItem);

const {width, height} = Dimensions.get('window');

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  header: {
    textTransform: 'uppercase',
    color: CommonColors.primaryText,
  },
  flexOne: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  topPageContainer: {
    flex: 1,
  },
  topView: {
    width: 'auto',
    height: height * 0.5,
  },
  topImage: {
    flex: 1,
  },
  topLabel: {
    fontSize: '16@s',
    color: CommonColors.lightText,
    ...Fonts.defaultBold,
    position: 'absolute',
    top: '10@s',
    left: '16@s',
    width: '80%',
    zIndex: 1000,
  },
  image: {
    width: 'auto',
    height: scale(150),
    marginBottom: scale(10),
  },
  label: {
    fontSize: '14@s',
    color: CommonColors.mainText,
    ...Fonts.defaultRegular,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: '10@s',
  },
  itemContent: {
    flex: 1,
    padding: '16@s',
  },
  title: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: scale(14),
    color: '#000',
    marginTop: scale(10),
  },
  page: {},
  footer: {
    height: scale(40),
    backgroundColor: CommonColors.mainText,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: scale(16),
  },
  footerTitle: {
    alignSelf: 'center',
    fontSize: scale(16),
    color: '#FFF',
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  topTagContainer: {
    flexWrap: 'wrap',
    position: 'absolute',
    bottom: '10@s',
    paddingHorizontal: '16@s',
  },
  topTag: {
    padding: 5,
    paddingLeft: 0,
    marginRight: 5,
    borderRadius: 5,
    marginBottom: 3,
    marginTop: 5,
  },
  thirdTag: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  thirdTagTitle: {
    color: '#FFF',
    fontSize: 14,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    zIndex: 100,
    position: 'absolute',
    top: 0,
  },
});
