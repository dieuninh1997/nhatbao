import {StatusBar, Platform} from 'react-native';
import {moderateScale, scale} from '../libs/reactSizeMatter/scalingUtils';
import Utils from './Utils';

const Fonts = {
  defaultRegular: {
    fontFamily: 'Roboto-Regular',
  },
  defaultBold: {
    fontFamily: 'Roboto-Bold',
  },
  defaultBlack: {
    fontFamily: 'Roboto-Black',
  },
  defaultItalic: {
    fontFamily: 'Roboto-Italic',
  },
};

class CommonColors {
  static headerBarBgColor = '#FFF';
  static mainText = '#4B4B4B';
  static primaryText = '#262626';
  static separator = '#F7F7F7';
  static tabbar = '#0a0a0a';
  static activeTintColor = '#fdfdfd';
  static inActiveTintColor = '#585858';
}

class CommonSize {
  static contentPadding = scale(16);

  static headerTitleFontSize = '15@ms';

  static inputHeight = '40@s';

  static inputFontSize = '14@ms';

  static formLabelFontSize = '14@ms';

  static btnSubmitHeight = scale(35);

  static paddingTopHeader =
    Platform.OS === 'ios'
      ? Utils.isIphoneX()
        ? scale(34)
        : scale(20)
      : StatusBar.currentHeight;

  static headerHeight = scale(59) + CommonSize.paddingTopHeader;

  static marginBottom = scale(30);
}

const CommonStyles = {
  screen: {
    flex: 1,
  },
  header: {
    backgroundColor: CommonColors.headerBarBgColor,
    height: CommonSize.headerHeight,
    paddingTop: CommonSize.paddingTopHeader,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerHome: {
    backgroundColor: CommonColors.headerBarBgColor,
    elevation: 0,
    height: CommonSize.headerHeight + scale(13),
    paddingTop: CommonSize.paddingTopHeader,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center',
    ...Fonts.defaultBold,
  },
};

const ShadowStyle = {
  shadowColor: '#000',
  shadowOpacity: 0.07,
  shadowOffset: {
    width: 0,
    height: 4,
  },
  elevation: 3,
};

const TextButtonStyle = {
  fontSize: '12@s',
  fontWeight: '500',
  textTransform: 'uppercase',
  color: CommonColors.mainText,
};

const SeparatorStyle = {
  width: '100%',
  height: scale(1),
  backgroundColor: CommonColors.separator,
};

export {
  CommonStyles,
  CommonColors,
  CommonSize,
  Fonts,
  ShadowStyle,
  TextButtonStyle,
  SeparatorStyle,
};
