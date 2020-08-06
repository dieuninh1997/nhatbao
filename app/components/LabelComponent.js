import React from 'react';
import {Text} from 'react-native';
import {moderateScale} from '../libs/reactSizeMatter/scalingUtils';
import {CommonColors, Fonts} from '../utils/CommonStyles';
import ScaledSheet from '../libs/reactSizeMatter/ScaledSheet';

export default function LabelComponent(props) {
  const {focused, title, style} = props;
  return (
    <Text
      allowFontScaling={false}
      style={[
        {
          color: focused
            ? CommonColors.activeTintColor
            : CommonColors.inActiveTintColor,
        },
        styles.container,
        style,
      ]}>
      {title}
    </Text>
  );
}

const styles = ScaledSheet.create({
  container: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    ...Fonts.defaultRegular,
    // textAlign: 'center',
  },
});
