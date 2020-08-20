import React, {useState} from 'react';
import {View, Switch, Image} from 'react-native';

import Text from '../../components/Text';
import Header from '../../components/Header';
import {CommonStyles, CommonColors, Fonts} from '../../utils/CommonStyles';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import AddUserIcon from '../../../assets/svg/ic_add_user.svg';
import SettingIcon from '../../../assets/svg/ic_settings';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AvatarIcon from '../../../assets/svg/ic_avatar_user.svg';

function AccountScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Header
        right={
          <View style={styles.row}>
            <AddUserIcon color={'#989898'} width={20} height={20} />
            <View style={styles.space} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SettingScreen');
              }}>
              <SettingIcon color={'#989898'} width={20} height={20} />
            </TouchableOpacity>
          </View>
        }
      />
      <View style={styles.profile}>
        <AvatarIcon width={50} height={50} color="#ccc" />
        <Text style={styles.title}>{I18n.t('AccountScreen.yourProfile')}</Text>
      </View>
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
  profile: {
    padding: '10@s',
    flex: 1,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: '16@ms',
    color: CommonColors.mainText,
    ...Fonts.defaultBold,
    marginTop: '10@s',
    textTransform: 'uppercase',
  },
});
