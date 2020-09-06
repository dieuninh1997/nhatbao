import React, {useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import _ from 'lodash';
import FastImage from 'react-native-fast-image';
import Slideshow from '../../components/Slideshow';

import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import Text from '../../components/Text';
import {CommonColors, Fonts, CommonStyles} from '../../utils/CommonStyles';
import BackButton from '../../components/BackButton';
import Header from '../../components/Header';
import I18n from '../../i18n/i18n';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';
import {getDiffHours} from '../../utils/Filter';

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
  const tags = item?.detail_keywords?.slice(0, 3);
  const images = item?.detail_images;
  const dataSource = images
    ? images.map((img) => {
        return {url: img};
      })
    : [];

    
  let bgColor = null
  if (item?.color) {
    bgColor = `rgb(${item.color[0]}, ${item.color[1]}, ${item.color[2]})`
  }
   
   
  return (
    <View activeOpacity={1} style={styles.slideInnerContainer}>
      <View style={styles.shadow} />
      <View
        style={[
          styles.imageContainer,
          index % 2 === 0 ? styles.imageContainerEven : {},
          bgColor ? {backgroundColor: bgColor} : null
        ]}>
        {!images || images.length < 2 ? (
          <FastImage source={{uri: item.image}} style={styles.image}  resizeMode={FastImage.resizeMode.cover}/>
        ) : (
          <Slideshow
            dataSource={dataSource}
            containerStyle={[styles.sliderImage]}
            height={(height * 0.68) / 2}
            indicatorSize={scale(6)}
          />
        )}
        {/* <View
          style={[
            styles.radiusMask,
            index % 2 === 0 ? styles.radiusMaskEven : {},
          ]}
        /> */}
      </View>
      <View
        style={[
          styles.textContainer,
          index % 2 === 0 ? styles.textContainerEven : {},
          bgColor ? {backgroundColor: bgColor} : null
        ]}>
        
        <Text 
          style={[
            styles.domainText, 
            item?.text_color === 1 ? {color: '#FFF'} : null
          ]}>{item.domain}</Text>
        
        <Text
          style={[
            styles.title, 
            item?.text_color === 1 ? {color: '#FFF'} : null
            // index % 2 === 0 ? styles.titleEven : {}
          ]}
          numberOfLines={2}>
          {item.title}
        </Text>

        <Text
          style={[
            styles.subtitle, 
            item?.text_color === 1 ? {color: '#FFF'} : null
            // index % 2 === 0 ? styles.subtitleEven : {}
          ]}>
          {getDiffHours(item.timestamp)}
        </Text>

        <Text
          style={[
            styles.subtitle, 
            item?.text_color === 1 ? {color: '#FFF'} : null
            // index % 2 === 0 ? styles.subtitleEven : {}
          ]}>
         

          {item.description}
        </Text>

        {tags ? (
          <View style={styles.tagContainer}>
            {tags.map((tag) => (
              <TouchableOpacity
                key={tag.id}
                style={styles.tagTitle}
                onPress={() => {
                  navigation.navigate('WebviewScreen', {linkUrl: tag.link});
                }}>
                <Text style={styles.tagText}>{tag.keyword}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
        <TouchableOpacity
          style={[
            styles.btnViewAll,
            {backgroundColor: CommonColors.indicatorColor}
            // index % 2 === 0
            //   ? {backgroundColor: CommonColors.indicatorColor}
            //   : null,
          ]}
          onPress={() => {
            navigation.navigate('WebviewScreen', {linkUrl: item.link});
          }}>
          <Text
            style={[
              styles.viewAllTitle,
              styles.viewAllTitleEven
              // index % 2 === 0 ? styles.viewAllTitleEven : {},
            ]}>
            {I18n.t('FollowScreen.viewAll')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
          width: props.width / 10,
          height: props.width / 10,
          borderRadius: 5,
          marginHorizontal: 7,
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
  const [slider1ActiveSlide, setSlider1ActiveSlide] = useState(0);
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
          itemWidth={width * 0.82}
          onSnapToItem={(index) => {
            setIndexTitle(index + 1);
            if (index >= data.length / 10) {
              index = index % 10;
            }
            setSlider1ActiveSlide(index);
          }}
          firstItem={0}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
        />
        <Pagination
          dotsLength={parseInt(data.length / 10)}
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
    width: width * 0.8,
    height: height * 0.75,
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
    backgroundColor: '#FFF',
  },
  imageContainerEven: {
    backgroundColor: '#000',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  sliderImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
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
    flex: 1,
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
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  titleEven: {
    color: 'white',
  },
  subtitle: {
    marginTop: 6,
    color: '#000',
    // color: '#424949',
    fontSize: 12,
    fontStyle: 'italic',
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  domainText: {
    marginBottom: 6,
    color: '#000',
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  timeText: {
    marginTop: 6,
    // color: '#424949',
    color: '#000',
    fontSize: 12,
    fontStyle: 'italic',
  },
  indexTitle: {
    fontSize: '20@ms',
    fontStyle: 'italic',
    color: '#000',
    ...Fonts.defaultBold,
  },
  tagContainer: {
    marginTop: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagTitle: {
    backgroundColor: CommonColors.indicatorColor,
    marginRight: 5,
    marginBottom: 5,
    padding: 5,
    borderRadius: 12,
  },
  tagText: {
    color: CommonColors.lightText,
    fontSize: 12,
    fontStyle: 'italic',
  },
  viewAllTitle: {
    color: CommonColors.indicatorColor,
    fontSize: 14,
    fontStyle: 'italic',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  viewAllTitleEven: {
    color: '#FFF',
  },
  btnViewAll: {
    position: 'absolute',
    bottom: '26@s',
    alignItems: 'center',
    justifyContent: 'center',
    height: '45@s',
    borderWidth: 1,
    borderColor: CommonColors.indicatorColor,
    width: '100%',
    borderRadius: '8@s',
    alignSelf: 'center',
  },
});
