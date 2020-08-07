import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import BackIcon from '../../assets/svg/ic_back.svg';
import Text from './Text';
import {moderateScale, scale} from '../libs/reactSizeMatter/scalingUtils';
import {CommonColors} from '../utils/CommonStyles';
import I18n from '../i18n/i18n';
import ScaledSheet from '../libs/reactSizeMatter/ScaledSheet';

export default function BackButton(props) {
  const navigation = useNavigation();
  const {isShowBackLabel = false, white = false} = props;
  return (
    <TouchableOpacity
      hitSlop={{
        top: 30,
        right: 30,
        left: 30,
        bottom: 30,
      }}
      onPress={() => navigation.goBack()}>
      <View style={styles.container}>
        <BackIcon width={18} height={18} color={'#000'} />
        {isShowBackLabel && (
          <Text
            style={[
              styles.label,
              {color: white ? '#fff' : CommonColors.headerTextColor},
            ]}>
            {I18n.t('app.back')}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
  },
  label: {
    marginLeft: scale(5),
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});
