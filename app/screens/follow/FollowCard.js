import React, {useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import Text from '../../components/Text';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';
import {CommonColors, Fonts, CommonStyles} from '../../utils/CommonStyles';
import BackButton from '../../components/BackButton';
import Header from '../../components/Header';

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

const renderItem = ({item, index}, navigation) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.slideInnerContainer}
      onPress={() => {
        navigation.navigate('WebviewScreen', {linkUrl: item.link});
      }}>
      <View style={styles.shadow} />
      <View
        style={[
          styles.imageContainer,
          index % 2 === 0 ? styles.imageContainerEven : {},
        ]}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View
          style={[
            styles.radiusMask,
            index % 2 === 0 ? styles.radiusMaskEven : {},
          ]}
        />
      </View>
      <View
        style={[
          styles.textContainer,
          index % 2 === 0 ? styles.textContainerEven : {},
        ]}>
        <Text
          style={[styles.title, index % 2 === 0 ? styles.titleEven : {}]}
          numberOfLines={2}>
          {item.title}
        </Text>

        <Text
          style={[styles.subtitle, index % 2 === 0 ? styles.subtitleEven : {}]}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const CarouselPaginationBar = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.carouselRef.current.snapToItem(props.index);
      }}>
      <View
        style={{
          width: props.width / 5,
          height: 3,
          borderRadius: 5,
          marginHorizontal: 10,
        }}
        backgroundColor={
          props.inactive ? 'rgba(0, 0, 0, 0.20)' : 'rgba(0, 0, 0, 0.90)'
        }
      />
    </TouchableOpacity>
  );
};

function FollowCard({navigation, route, value}) {
  const title = route?.params?.value;
  const feeds = _.get(value, 'feeds', {});
  const data = feeds[`${title}`];
  const _slider1Ref = useRef(null);
  const [slider1ActiveSlide, setSlider1ActiveSlide] = useState(1);
  const [indexTitle, setIndexTitle] = useState(1);

  return (
    <View style={styles.container}>
      {renderHeader(title)}
      <View style={styles.content}>
        <Carousel
          ref={_slider1Ref}
          data={data}
          renderItem={({item, index}) => renderItem({item, index}, navigation)}
          sliderWidth={width}
          itemWidth={width * 0.7}
          onSnapToItem={(index) => {
            setIndexTitle(index);
            if (index >= data.length / 10) {
              index = index % 10;
            }
            setSlider1ActiveSlide(index);
          }}
          firstItem={1}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
        />
        <Pagination
          dotsLength={data.length / 10}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={'rgba(255, 255, 255, 0.92)'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={'#000'}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={_slider1Ref}
          tappableDots={!!_slider1Ref}
          dotElement={<Text style={styles.indexTitle}>{indexTitle}</Text>}
          inactiveDotElement={
            <CarouselPaginationBar
              width={width / 10}
              carouselRef={_slider1Ref}
              inactive
            />
          }
        />
      </View>
    </View>
  );
}

export default connect((state) => ({
  value: state.feeds,
}))(FollowCard);

const {width, height} = Dimensions.get('window');

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: '10@s',
  },
  header: {
    textTransform: 'uppercase',
    color: CommonColors.primaryText,
  },
  slide: {
    backgroundColor: 'floralwhite',
    borderRadius: 5,
    height: 250,
    padding: 50,
    marginLeft: 25,
    marginRight: 25,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  slider: {
    marginTop: 15,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
  slideInnerContainer: {
    width: width * 0.7,
    height: height * 0.75,
    paddingHorizontal: '10@s',
    paddingBottom: 18, // needed for shadow
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: 2,
    right: 2,
    bottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    borderRadius: 8,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.OS === 'ios' ? 0 : -1, // Prevent a random Android rendering issue
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#dddeef',
  },
  imageContainerEven: {
    backgroundColor: '#000',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: Platform.OS === 'ios' ? 8 : 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: 'white',
  },
  radiusMaskEven: {
    backgroundColor: '#000',
  },
  textContainer: {
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  textContainerEven: {
    backgroundColor: '#000',
  },
  title: {
    color: '#000',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  titleEven: {
    color: 'white',
  },
  subtitle: {
    marginTop: 6,
    color: '#ccc',
    fontSize: 12,
    fontStyle: 'italic',
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  indexTitle: {
    fontSize: '20@ms',
    fontStyle: 'italic',
    color: '#000',
    ...Fonts.defaultBold,
  },
});
