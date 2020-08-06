import React from 'react';
import {View, FlatList, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';

import Text from '../../../components/Text';
import ScaledSheet from '../../../libs/reactSizeMatter/ScaledSheet';
import {scale} from '../../../libs/reactSizeMatter/scalingUtils';
import {CommonColors, Fonts} from '../../../utils/CommonStyles';

const renderItem = ({item, index}) => {
  console.log('================================================');
  console.log('item', item);
  console.log('================================================');
  return (
    <View
      style={[
        styles.itemContainer,
        index % 2 === 0 ? {marginRight: scale(1)} : {},
      ]}>
      <Image
        style={styles.image}
        resizeMode={'cover'}
        source={{uri: item.image}}
      />
      <Text style={styles.label}>{item.title}</Text>
    </View>
  );
};

function ItemTab(props) {
  const {data} = props;
  const topImg = data[0];
  const arr = _.toArray(data);
  let images = [];
  arr.map((item, index) => {
    if (index > 0) {
      images.push(item);
    }
  });
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* topView */}
        <View style={styles.topViewContainer}>
          <Image
            style={styles.topImage}
            resizeMode={'cover'}
            source={{uri: topImg.image}}
          />
          <Text style={styles.topLabel}>{topImg.title}</Text>
        </View>
        {/* list */}
        <FlatList
          style={styles.list}
          horizontal={false}
          numColumns={2}
          data={images}
          keyExtractor={(item, index) => `${item} + ${index}`}
          renderItem={renderItem}
        />
      </ScrollView>
    </View>
  );
}

export default ItemTab;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonColors.bgColor,
  },
  list: {
    flex: 1,
    backgroundColor: CommonColors.hintColor,
  },
  topViewContainer: {
    width: 'auto',
    height: scale(250),
  },
  topImage: {
    flex: 1,
    height: scale(180),
    marginHorizontal: scale(10),
    marginTop: scale(10),
  },
  image: {
    width: 'auto',
    height: scale(150),
    marginBottom: scale(10),
  },
  itemContainer: {
    flex: 1,
    height: scale(250),
    backgroundColor: '#FFF',
    padding: scale(10),
    marginBottom: scale(1),
  },
  label: {
    fontSize: '14@s',
    color: CommonColors.mainText,
    ...Fonts.defaultRegular,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: CommonColors.border,
    borderRightColor: CommonColors.border,
    borderBottomColor: CommonColors.border,
  },
  topLabel: {
    fontSize: '16@s',
    color: CommonColors.lightText,
    ...Fonts.defaultBold,
    position: 'absolute',
    bottom: scale(20),
    left: scale(20),
  },
});
