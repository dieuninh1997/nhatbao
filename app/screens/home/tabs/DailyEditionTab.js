import React from 'react';
import {View} from 'react-native';

import Text from '../../../components/Text';
import ScaledSheet from '../../../libs/reactSizeMatter/ScaledSheet';

function DailyEditionTab({navigation}) {
  return (
    <View style={styles.container}>
      <Text>DailyEditionTab</Text>
    </View>
  );
}

export default DailyEditionTab;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
});
