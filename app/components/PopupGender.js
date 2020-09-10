import React from 'react';
import {View, StatusBar, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Fonts} from '../utils/CommonStyles';
import Text from '../components/Text';
import I18n from '../i18n/i18n';
import CloseIcon from '../../assets/svg/ic_close.svg';
import ScaledSheet from '../libs/reactSizeMatter/ScaledSheet';
import MaleColorIcon from '../../assets/svg/ic_male_color.svg';
import FemaleColorIcon from '../../assets/svg/ic_female_color.svg';
import store from '../store';
import {chooseGender} from '../actions';
import AppPreferences from '../utils/AppPreferences';

export default function PopupGender(props) {
  const handleClosePopup = () => {
    store.dispatch(chooseGender('neutral'));
    AppPreferences.saveGender('neutral');
    props.moveTo();
  };
  const chooseFemale = () => {
    store.dispatch(chooseGender('female'));
    AppPreferences.saveGender('female');
    props.moveTo();
  };

  const chooseMale = () => {
    store.dispatch(chooseGender('male'));
    AppPreferences.saveGender('male');
    props.moveTo();
  };

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0.3}
      isVisible
      avoidKeyboard
      useNativeDriver>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeIcon}
          onPress={() => handleClosePopup()}>
          <CloseIcon width={20} height={20} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.title}>{I18n.t('PopupGender.title')}</Text>
          <Text style={styles.question}>{I18n.t('PopupGender.whoAraYou')}</Text>
          <TouchableOpacity
            onPress={() => chooseMale()}
            style={[styles.inactiveFemaleCircle, styles.leftView]}>
            <View style={styles.femaleView}>
              <View style={styles.femaleCircle}>
                <MaleColorIcon width={60} height={80} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => chooseFemale()}
            style={[styles.inactiveMaleCircle, styles.rightView]}>
            <View style={styles.maleView}>
              <View style={styles.maleCircle}>
                <FemaleColorIcon width={60} height={80} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 30,
    flexDirection: 'column',
  },
  closeIcon: {
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: '22@s',
    color: '#eff1f2',
    marginBottom: '16@s',
  },
  question: {
    fontSize: '26@s',
    color: '#FFF',
    ...Fonts.defaultBold,
  },

  femaleView: {
    width: '120@s',
    height: '120@s',
    backgroundColor: 'rgb(95, 197, 223)',
    borderRadius: '60@s',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maleView: {
    width: '120@s',
    height: '120@s',
    backgroundColor: '#f29576',
    borderRadius: '60@s',
    alignItems: 'center',
    justifyContent: 'center',
  },
  femaleCircle: {
    width: '100@s',
    height: '100@s',
    borderRadius: '50@s',
    backgroundColor: 'rgb(46, 180, 214)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeFemaleCircle: {
    backgroundColor: '#08b6fc',
  },
  inactiveFemaleCircle: {
    width: '140@s',
    height: '140@s',
    borderRadius: '70@s',
    backgroundColor: '#90d0e9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveMaleCircle: {
    width: '140@s',
    height: '140@s',
    borderRadius: '70@s',
    backgroundColor: '#f7bfac',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftView: {
    marginTop: '30@s',
    marginLeft: '30@s',
  },
  rightView: {
    marginTop: '30@s',
    marginRight: '30@s',
    alignSelf: 'flex-end',
  },
  maleCircle: {
    width: '100@s',
    height: '100@s',
    borderRadius: '50@s',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e57048',
  },
  activeMaleCircle: {
    backgroundColor: '#fd6430',
  },
});
