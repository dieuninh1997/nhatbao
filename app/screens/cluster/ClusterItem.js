import React, {useState} from 'react';
import {View, Switch, Image, TouchableOpacity} from 'react-native';

import Text from '../../components/Text';
import Header from '../../components/Header';
import {CommonStyles, CommonColors, Fonts} from '../../utils/CommonStyles';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import SettingIcon from '../../../assets/svg/ic_settings';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';
import AvatarIcon from '../../../assets/svg/ic_avatar_user.svg';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import BackButton from '../../components/BackButton';

export default (props) => {
  return (
    <View style={styles.container}>
      <Header
        left={<BackButton />}
        center={
          <Text style={[CommonStyles.headerTitle, styles.header]}>
            {I18n.t('ClusterScreen.header')}
          </Text>
        }
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  header: {
    textTransform: 'uppercase',
    color: CommonColors.primaryText,
  },
});
