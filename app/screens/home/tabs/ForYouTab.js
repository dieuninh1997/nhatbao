import React from 'react';
import {View} from 'react-native';

import Text from '../../../components/Text';
import ScaledSheet from '../../../libs/reactSizeMatter/ScaledSheet';

function ForYouTab({navigation}) {
  return (
    <View style={styles.container}>
      <Text>ForYouTab</Text>
    </View>
  );
}

export default ForYouTab;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
});
