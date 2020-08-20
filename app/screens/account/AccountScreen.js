import React, {useState} from 'react';
import {View, Switch, Image, TouchableOpacity} from 'react-native';

import Text from '../../components/Text';
import Header from '../../components/Header';
import {CommonStyles, CommonColors, Fonts} from '../../utils/CommonStyles';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import AddUserIcon from '../../../assets/svg/ic_add_user.svg';
import SettingIcon from '../../../assets/svg/ic_settings';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';
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
        <Text style={styles.profileTitle}>
          {I18n.t('AccountScreen.yourProfile')}
        </Text>
        <AvatarIcon width={50} height={50} color="#ccc" />
        <View style={styles.rowBtn}>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.btnName}>{I18n.t('SettingScreen.signUp')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roundBtnContainer, {marginLeft: scale(10)}]}>
            <Text style={styles.roundBtnName}>Log in</Text>
          </TouchableOpacity>
        </View>
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
  rowBtn: {
    flexDirection: 'row',
    marginTop: '10@s',
  },
  profile: {
    paddingHorizontal: '10@s',
    flex: 1,
    backgroundColor: '#FFF',
    marginVertical: '10@s',
  },
  profileTitle: {
    fontSize: '16@ms',
    color: CommonColors.mainText,
    ...Fonts.defaultBold,
    marginTop: '10@s',
    textTransform: 'uppercase',
    marginVertical: '10@s',
  },
  btnContainer: {
    height: '40@s',
    backgroundColor: CommonColors.indicatorColor,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '3@s',
  },
  roundBtnContainer: {
    height: '40@s',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '3@s',
    borderWidth: 1,
    borderColor: CommonColors.indicatorColor,
  },
  roundBtnName: {
    fontSize: '16@ms',
    color: CommonColors.indicatorColor,
    ...Fonts.defaultBold,
    textTransform: 'uppercase',
  },
  btnName: {
    fontSize: '16@ms',
    color: CommonColors.lightText,
    ...Fonts.defaultBold,
    textTransform: 'uppercase',
  },
});
