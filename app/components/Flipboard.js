import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import ScaledSheet from '../libs/reactSizeMatter/ScaledSheet';
import Interactable from './Interactable';
import Animated, {Extrapolate} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');
const perspective = Platform.OS === 'android' ? {} : {perspective: 1000};
const {Value, add} = Animated;

export default class Flipboard extends React.Component {
  static propTypes = {
    front: PropTypes.object,
    back: PropTypes.object,
    bottom: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
    };
  }

  onDrag = () => {
    const {isDragging} = this.state;
    if (!isDragging) {
      this.setState({isDragging: true});
    }
  };

  y = new Value(0);

  render() {
    const {y, onDrag} = this;
    const {isDragging} = this.state;
    const {front, back, bottom} = this.props;
    const snapPoints = bottom ? [{y: -height}, {y: 0}] : [{y: 0}, {y: height}];
    const inputRange = bottom ? [-height, 0] : [0, height];
    const outputRange = bottom ? [180, 0] : [0, -180];
    const rotateXAsDeg = y.interpolate({
      inputRange,
      outputRange,
      extrapolate: Extrapolate.CLAMP,
    });

    const rotateX = add(rotateXAsDeg, 'deg');
    const coef = bottom ? -1 : 1;
    const zIndex = Platform.OS === 'android' ? 'elevation' : 'zIndex';

    return (
      <View style={{flex: 1, [zIndex]: isDragging ? 1 : 0}}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            transform: [
              perspective,
              {translateY: (coef * height) / 4},
              {rotateX},
              {translateY: (coef * -height) / 4},
              {rotateY: '180deg'},
              {rotateZ: '180deg'},
            ],
          }}>
          {/* <Image
            resizeMode={'cover'}
            source={{
              uri: back.val.image,
            }}
            style={styles.image}
          /> */}
          <Text>{back.val.title}</Text>
        </Animated.View>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backfaceVisibility: 'hidden',
            transform: [
              perspective,
              {translateY: (coef * height) / 4},
              {rotateX},
              {translateY: (coef * -height) / 4},
            ],
          }}>
          <View>
            <Image
              source={{uri: front.val.image}}
              style={styles.image}
              resizeMode={'cover'}
            />
            {/* <Text>{front.val.title}</Text> */}
          </View>
        </Animated.View>
        <Interactable
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(100, 200, 300, 0.5)',
          }}
          verticalOnly
          {...{snapPoints, onDrag}}
          animatedValueY={y}
        />
      </View>
    );
  }
}

Flipboard.defaultProps = {
  bottom: false,
};

const styles = ScaledSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width,
    // height,
    // width,
    height: height / 2,
  },
});
