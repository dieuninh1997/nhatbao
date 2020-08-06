import React from 'react';
import {Text} from 'react-native';
import {moderateScale} from '../libs/reactSizeMatter/scalingUtils';
import {CommonColors, Fonts} from '../utils/CommonStyles';

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
          fontSize: moderateScale(12),
          fontWeight: 'bold',
          ...Fonts.defaultRegular,
          textAlign: 'center',
        },
        style,
      ]}>
      {title}
    </Text>
  );
}
