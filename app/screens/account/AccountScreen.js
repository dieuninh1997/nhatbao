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

export default (props) => {
  const navigation = useNavigation();
  const gender = useSelector((state) => state.user.gender);
  let genderText = '';
  if (gender === 'male') {
    genderText = I18n.t('AccountScreen.male');
  } else if (gender === 'female') {
    genderText = I18n.t('AccountScreen.female');
  } else {
    genderText = '--';
  }

  return (
    <View style={styles.container}>
      <Header
        left={
          <Text style={[CommonStyles.headerTitle, styles.header]}>
            {I18n.t('AccountScreen.header')}
          </Text>
        }
        right={
          <View style={styles.row}>
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AvatarIcon
            width={50}
            height={50}
            color={CommonColors.activeTintColor}
          />
          <View style={{flex: 1, marginLeft: scale(10)}}>
            <Text style={styles.infoText}>
              {I18n.t('AccountScreen.userName')}
            </Text>
            <Text style={styles.infoText}>{I18n.t('AccountScreen.email')}</Text>
            <Text style={styles.infoText}>{`${I18n.t(
              'AccountScreen.gender',
            )}: ${genderText}`}</Text>
          </View>
        </View>

        <View style={styles.rowBtn}>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.btnName}>{I18n.t('SettingScreen.signUp')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roundBtnContainer, {marginLeft: scale(10)}]}>
            <Text style={styles.roundBtnName}>
              {I18n.t('SettingScreen.logIn')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
  row: {
    flexDirection: 'row',
  },
  space: {
    width: '20@s',
  },
  rowBtn: {
    flexDirection: 'row',
    marginVertical: '10@s',
  },
  profile: {
    padding: '10@s',
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: '1@s',
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
    backgroundColor: CommonColors.activeTintColor,
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
    borderColor: CommonColors.activeTintColor,
  },
  roundBtnName: {
    fontSize: '16@ms',
    color: CommonColors.activeTintColor,
    ...Fonts.defaultBold,
    textTransform: 'uppercase',
  },
  btnName: {
    fontSize: '16@ms',
    color: CommonColors.lightText,
    ...Fonts.defaultBold,
    textTransform: 'uppercase',
  },
  infoText: {
    color: '#000',
    fontSize: '14@ms',
    marginBottom: '5@s',
  },
});
