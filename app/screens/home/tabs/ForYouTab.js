import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import FlipPage, {FlipPagePage} from 'react-native-flip-page';
import {connect} from 'react-redux';
import _ from 'lodash';

import Text from '../../../components/Text';
import ScaledSheet from '../../../libs/reactSizeMatter/ScaledSheet';
import {scale} from '../../../libs/reactSizeMatter/scalingUtils';
import {CommonColors, Fonts} from '../../../utils/CommonStyles';
import Header from '../../../components/Header';
import Utils from '../../../utils/Utils';
import Flipboard from '../../../components/Flipboard';

const renderTopPage = (navigation, data) => {
  const topImg = data[0];
  const secondImg = data[1];
  const thirdImg = data[2];

  return (
    <View style={styles.topPageContainer}>
      {/* top */}
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('WebviewScreen', {linkUrl: topImg.val.link});
        }}>
        <View style={styles.topView}>
          <ImageBackground
            style={styles.topImage}
            resizeMode={'cover'}
            source={{uri: topImg.val.image}}
          />
          <Text style={styles.topLabel} numberOfLines={3} ellipsizeMode="tail">
            {topImg.val.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.row}>
        {/* left */}
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('WebviewScreen', {linkUrl: secondImg.val.link});
          }}>
          <View style={[styles.itemContainer, {paddingRight: 0}]}>
            <Image
              style={styles.image}
              resizeMode={'cover'}
              source={{uri: secondImg.val.image}}
            />
            <Text style={styles.label} numberOfLines={3} ellipsizeMode="tail">
              {secondImg.val.title}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        {/* right */}
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('WebviewScreen', {linkUrl: thirdImg.val.link});
          }}>
          <View style={styles.itemContainer}>
            <Image
              style={styles.image}
              resizeMode={'cover'}
              source={{uri: thirdImg.val.image}}
            />
            <Text style={styles.label} numberOfLines={3} ellipsizeMode="tail">
              {thirdImg.val.title}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

function ForYouTab({navigation, value}) {
  const feeds = _.get(value, 'feeds', {});
  const beauty = feeds ? feeds.beauty : [];
  const arrBeauty = _.map(beauty, (val, key) => ({key, val}));
  const topPage = arrBeauty ? arrBeauty.slice(0, 3) : [];
  let images = [];
  arrBeauty.map((item, index) => {
    if (index >= 0 && index < 5) {
      images.push(item);
    }
  });

  return (
    <View style={styles.container}>
      {/* {images.map((item, index) => {
        const current = item;
        const prev = images[index - 1];
        const next = images[index + 1];

        if (!prev || !next) {
          return <View key={index} />;
        }
        if (prev) {
          return <Flipboard key={index} front={current} back={prev} />;
        }
        if (next) {
          return <Flipboard key={index} front={current} back={next} bottom />;
        }
      })} */}
      <FlipPage>
        <FlipPagePage>{renderTopPage(navigation, topPage)}</FlipPagePage>

        {images.length > 0 &&
          images.map((item, index) => {
            return (
              <FlipPagePage key={index}>
                <Image
                  style={{width: '100%', height: '50%'}}
                  resizeMode={'cover'}
                  source={{uri: item.val.image}}
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
          })}
      </FlipPage>
    </View>
  );
}

export default connect((state) => ({
  value: state.feeds,
}))(ForYouTab);

const {width, height} = Dimensions.get('window');

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
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
    bottom: '16@s',
    left: '16@s',
    width: '80%',
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
});
