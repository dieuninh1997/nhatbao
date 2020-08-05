import I18n from 'react-native-i18n';
import en from './locales/en';
import vn from './locales/vn';

I18n.defaultLocale = 'en';
I18n.locale = 'en';
I18n.fallbacks = true;

I18n.translations = {
  en,
  vn,
};
export default I18n;
