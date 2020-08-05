import React, {useState} from 'react';
import {View, Switch} from 'react-native';

import Text from '../../components/Text';
import Header from '../../components/Header';
import {CommonStyles, CommonColors} from '../../utils/CommonStyles';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';

function ExploreScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Header
        left={
          <Text
            style={[
              CommonStyles.headerTitle,
              {textTransform: 'uppercase', color: CommonColors.primaryText},
            ]}>
            {I18n.t('ExploreScreen.header')}
          </Text>
        }
      />
    </View>
  );
}

export default ExploreScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
});
