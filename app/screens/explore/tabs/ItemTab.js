import React from 'react';
import {
  View,
  FlatList,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
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
  console.log('================================================');
  console.log('arr', arr);
  console.log('topImg', topImg);
  console.log('================================================');
  let images = [];
  arr.map((item, index) => {
    if (index > 0) {
      images.push(item);
    }
  });
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* topView */}
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('WebviewScreen', {linkUrl: topImg.val.link});
          }}>
          <View style={styles.topViewContainer}>
            <ImageBackground
              style={styles.topImage}
              resizeMode={'cover'}
              source={{uri: topImg.val.image}}>
              {/* <LinearGradient
                ref={(r) => (this.gradiant = r)}
                locations={[0.5, 0]}
                colors={[
                  'rgba(170, 170, 170, 0.1)',
                  'rgba(115, 115, 115, 1)',
                  'rgba(255, 255, 255, 0.1)',
                ]}
                style={styles.gradientView}
              /> */}
            </ImageBackground>

            <Text
              style={styles.topLabel}
              numberOfLines={1}
              ellipsizeMode="tail">
              {topImg.val.title}
            </Text>
          </View>
        </TouchableWithoutFeedback>

        {/* list */}
        <FlatList
          style={styles.list}
          horizontal={false}
          numColumns={2}
          data={images}
          keyExtractor={(item, index) => `${item} + ${index}`}
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
                    index % 2 === 0 ? {marginRight: scale(1)} : {},
                  ]}>
                  <Image
                    style={styles.image}
                    resizeMode={'cover'}
                    source={{uri: item.val.image}}
                  />
                  <Text
                    style={styles.label}
                    numberOfLines={3}
                    ellipsizeMode="tail">
                    {item.val.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </ScrollView>
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
    marginBottom: scale(10),
  },
  itemContainer: {
    flex: 1,
    height: scale(250),
    backgroundColor: '#FFF',
    padding: scale(10),
    marginBottom: scale(1),
  },
  label: {
    fontSize: '14@s',
    color: CommonColors.mainText,
    ...Fonts.defaultRegular,
  },
  topLabel: {
    fontSize: '16@s',
    color: CommonColors.lightText,
    ...Fonts.defaultBold,
    position: 'absolute',
    top: 20,
    left: 20,
    width: '80%',
  },
});
