import React, {useState} from 'react';
import {View} from 'react-native';

import Text from '../../components/Text';
import Header from '../../components/Header';
import {CommonStyles, CommonColors} from '../../utils/CommonStyles';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import ReloadIcon from '../../../assets/svg/ic_reload.svg';

function FollowScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Header
        left={
          <Text
            style={[
              CommonStyles.headerTitle,
              {textTransform: 'uppercase', color: CommonColors.primaryText},
            ]}>
            {I18n.t('FollowScreen.header')}
          </Text>
        }
        right={<ReloadIcon color={'#989898'} width={20} height={20} />}
      />
    </View>
  );
}

export default FollowScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
});
