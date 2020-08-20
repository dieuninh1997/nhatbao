import React, {useState} from 'react';
import {
  View,
  Switch,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import Text from '../../components/Text';
import Header from '../../components/Header';
import {CommonStyles, CommonColors, Fonts} from '../../utils/CommonStyles';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import AddUserIcon from '../../../assets/svg/ic_add_user.svg';
import SettingIcon from '../../../assets/svg/ic_settings';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';
import AvatarIcon from '../../../assets/svg/ic_avatar_user.svg';
import LanguageIcon from '../../../assets/svg/ic_language.svg';
import ArrowIcon from '../../../assets/svg/ic_next.svg';
import AppPreferences from '../../utils/AppPreferences';
import store from '../../store';
import * as actions from '../../actions';
import BackButton from '../../components/BackButton';

function SettingScreen({navigation, language}) {
  const [userLocale, setUserLocale] = useState(language);
  const [showLanguage, setShowLanguage] = useState(false);

  const changeLocale = (locale) => {
    setUserLocale(locale);
    I18n.locale = locale;
    AppPreferences.saveLocale(locale);
    store.dispatch(actions.changeLanguage(locale));
  };

  return (
    <View style={styles.container}>
      <Header
        left={<BackButton />}
        center={
          <Text style={[CommonStyles.headerTitle, styles.header]}>
            {I18n.t('SettingScreen.header')}
          </Text>
        }
      />
      <View style={styles.setting}>
        {/* <Text style={styles.settingTitle}>
          {I18n.t('SettingScreen.header')}
        </Text> */}
        <TouchableWithoutFeedback
          onPress={() => {
            setShowLanguage(!showLanguage);
          }}>
          <View style={styles.rowItem}>
            <LanguageIcon
              width={25}
              height={25}
              color={CommonColors.mainText}
            />
            <Text style={styles.title}>{I18n.t('SettingScreen.language')}</Text>
            <Text style={styles.langTitle}>{userLocale}</Text>
            <ArrowIcon width={15} height={15} color="#000" />
          </View>
        </TouchableWithoutFeedback>
        {showLanguage && (
          <View>
            <TouchableWithoutFeedback onPress={() => changeLocale('en')}>
              <View style={styles.itemLanguage}>
                <Text
                  style={[
                    styles.titleLanguage,
                    userLocale === 'en'
                      ? {color: CommonColors.indicatorColor}
                      : null,
                  ]}>
                  {I18n.t('SettingScreen.en')}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => changeLocale('vn')}>
              <View style={styles.itemLanguage}>
                <Text
                  style={[
                    styles.titleLanguage,
                    userLocale === 'vn'
                      ? {color: CommonColors.indicatorColor}
                      : null,
                  ]}>
                  {I18n.t('SettingScreen.vn')}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
    </View>
  );
}

export default connect((state) => ({
  language: state.user.language,
}))(SettingScreen);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  header: {
    color: CommonColors.primaryText,
    ...Fonts.defaultRegular,
  },
  rowItem: {
    marginTop: 1,
    height: '50@s',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    padding: '10@s',
    alignItems: 'center',
  },
  title: {
    fontSize: '16@ms',
    color: CommonColors.mainText,
    ...Fonts.defaultRegular,
    marginLeft: '10@s',
    flex: 1,
  },
  listLanguage: {},
  itemLanguage: {
    height: '40@s',
    flexDirection: 'row',
    paddingHorizontal: '10@s',
    alignItems: 'center',
    marginBottom: 1,
    backgroundColor: '#FFF',
  },
  titleLanguage: {
    fontSize: '12@ms',
    color: CommonColors.mainText,
    ...Fonts.defaultRegular,
  },
  langTitle: {
    fontSize: '16@ms',
    color: CommonColors.indicatorColor,
    ...Fonts.defaultRegular,
    marginRight: '10@s',
    textTransform: 'uppercase',
  },
  setting: {
    flex: 1,
  },
  settingTitle: {
    fontSize: '16@ms',
    color: CommonColors.mainText,
    ...Fonts.defaultBold,
    marginTop: '10@s',
    textTransform: 'uppercase',
    marginVertical: '10@s',
    paddingHorizontal: '10@s',
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
