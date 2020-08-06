import React from 'react';
import {View} from 'react-native';

import Text from '../../../components/Text';
import ScaledSheet from '../../../libs/reactSizeMatter/ScaledSheet';

function ItemTab({navigation}) {
  return (
    <View style={styles.container}>
      <Text>ItemTab</Text>
    </View>
  );
}

export default ItemTab;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
});
