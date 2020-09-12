import React, {useState, useEffect} from 'react';
import {
  View,
  Switch,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import _ from 'lodash';

import Text from '../../components/Text';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import NextIcon from '../../../assets/svg/ic_arrow_next.svg';
import {CommonColors} from '../../utils/CommonStyles';

export default (props) => {
  const navigation = useNavigation();
  const cover = useSelector((state) => state.cover.cover);
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0))
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, navigation]);

  const renderCover = () => {
    if (_.isEmpty(cover)) {
      return null;
    }
    const firstCover = cover && cover[0];
    const img = firstCover.detail_images[0];
    const title = firstCover.title;

    return (
      <View style={styles.content}>
        <Animated.Image
          source={{uri: img}}
          style={{
            height,
            width: width * 1.4,
            zIndex: 2,
            transform: [
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-width * 0.2, 0],
                }),
              },
            ],
          }}
        />
        <View style={styles.textContainer}>
          <View style={{flex: 1}} />
          <View style={[styles.row, {alignItems: 'center'}]}>
            <Text style={styles.titleText}>{title}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MainScreen');
              }}>
              <NextIcon width={25} height={25} color={'#FFF'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return <View style={styles.container}>{renderCover()}</View>;
};

const {width, height} = Dimensions.get('window');
const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  content: {
    width,
    height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  textContainer: {
    position: 'absolute',
    zIndex: 1000,
    padding: 16,
    paddingBottom: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width,
    height,
  },
  titleText: {
    flex: 1,
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 24,
    textTransform: 'uppercase',
  },
});
