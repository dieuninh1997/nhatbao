import AsyncStorage from '@react-native-community/async-storage';

export default class AppPreferences {
  static saveLocale(locale) {
    AsyncStorage.setItem('user_locale', locale);
  }

  static async getLocale() {
    return await AsyncStorage.getItem('user_locale');
  }

  static saveGender(gender) {
    AsyncStorage.setItem('user_gender', gender);
  }

  static async getGender() {
    return await AsyncStorage.getItem('user_gender');
  }
}
