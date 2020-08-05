import React, {useState} from 'react';
import {View, Switch} from 'react-native';

import Text from '../../components/Text';
import Header from '../../components/Header';
import {CommonStyles} from '../../utils/CommonStyles';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import AddUserIcon from '../../../assets/svg/ic_add_user.svg';
import SettingIcon from '../../../assets/svg/ic_settings';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';

function AccountScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Header
        right={
          <View style={styles.row}>
            <AddUserIcon color={'#989898'} width={20} height={20} />
            <View style={styles.space} />
            <SettingIcon color={'#989898'} width={20} height={20} />
          </View>
        }
      />
    </View>
  );
}

export default AccountScreen;

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
