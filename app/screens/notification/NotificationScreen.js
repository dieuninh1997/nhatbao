import React, {useState} from 'react';
import {View, Switch} from 'react-native';

import Text from '../../components/Text';
import Header from '../../components/Header';
import {CommonStyles, CommonColors} from '../../utils/CommonStyles';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import ReloadIcon from '../../../assets/svg/ic_reload.svg';
import SettingIcon from '../../../assets/svg/ic_settings';

function NotificationScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Header
        left={
          <Text
            style={[
              CommonStyles.headerTitle,
              {textTransform: 'uppercase', color: CommonColors.primaryText},
            ]}>
            {I18n.t('NotificationScreen.header')}
          </Text>
        }
        right={
          <View style={styles.row}>
            <ReloadIcon color={'#989898'} width={20} height={20} />
            <View style={styles.space} />
            <SettingIcon color={'#989898'} width={20} height={20} />
          </View>
        }
      />
    </View>
  );
}

export default NotificationScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  space: {
    width: '20@s',
  },
});
