import React from 'react';
import {
  View,
  FlatList,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import Text from '../../../components/Text';
import ScaledSheet from '../../../libs/reactSizeMatter/ScaledSheet';
import {scale} from '../../../libs/reactSizeMatter/scalingUtils';
import {CommonColors, Fonts} from '../../../utils/CommonStyles';

function ItemTab(props) {
  const navigation = useNavigation();
  const {data} = props;
  const arr = _.map(data, (val, key) => ({key, val}));
  const topImg = arr[0];

  let images = [];
  arr.map((item, index) => {
    if (index > 0) {
      images.push(item);
    }
  });
  const getHeader = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('WebviewScreen', {linkUrl: topImg.val.link});
        }}>
        <View style={styles.topViewContainer}>
          <ImageBackground
            style={styles.topImage}
            resizeMode={'cover'}
            source={{uri: topImg.val.image}}
          />
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={[
              'rgba(0, 0, 0, 0.8)',
              'rgba(0, 0, 0, 0.2)',
              'rgba(238, 238, 238, 0.1)',
            ]}
            style={styles.gradientView}
          />
          <Text style={styles.topLabel} numberOfLines={1} ellipsizeMode="tail">
            {topImg.val.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <View style={styles.container}>
      {/* list */}
      <FlatList
        style={styles.list}
        numColumns={2}
        data={images}
        keyExtractor={(item, index) => `${item} + ${index}`}
        ListHeaderComponent={getHeader}
        renderItem={({item, index}) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('WebviewScreen', {
                  linkUrl: item.val.link,
                });
              }}>
              <View
                style={[
                  styles.itemContainer,
                  index % 2 === 0 ? {paddingRight: 0} : {},
                ]}>
                <Image
                  style={styles.image}
                  resizeMode={'cover'}
                  source={{uri: item.val.image}}
                />
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  colors={[
                    'rgba(0, 0, 0, 0.8)',
                    'rgba(0, 0, 0, 0.2)',
                    'rgba(238, 238, 238, 0.1)',
                  ]}
                  style={styles.gradientView}
                />
                <Text
                  style={styles.label}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {item.val.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
    </View>
  );
}

export default ItemTab;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonColors.bgColor,
  },
  list: {
    flex: 1,
    backgroundColor: CommonColors.lightSeparator,
  },
  topViewContainer: {
    width: 'auto',
    height: scale(200),
  },
  gradientView: {
    position: 'absolute',
    zIndex: 100,
    top: 10,
    left: 10,
    width: '100%',
    height: '100%',
  },
  topImage: {
    flex: 1,
    marginHorizontal: scale(10),
    marginTop: scale(10),
  },
  image: {
    width: 'auto',
    height: scale(150),
  },
  itemContainer: {
    flex: 1,
    height: scale(150),
    backgroundColor: '#FFF',
    padding: scale(10),
  },
  label: {
    fontSize: '14@s',
    color: CommonColors.lightText,
    ...Fonts.defaultRegular,
    position: 'absolute',
    top: 0,
    zIndex: 1000,
    flexWrap: 'wrap',
    padding: '15@s',
  },
  topLabel: {
    fontSize: '16@s',
    color: CommonColors.lightText,
    ...Fonts.defaultBold,
    position: 'absolute',
    top: 0,
    width: '80%',
    zIndex: 1000,
    padding: '20@s',
  },
});
