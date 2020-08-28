import React from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import FlipPage, {FlipPagePage} from 'react-native-flip-page';
import {connect} from 'react-redux';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import Text from '../../components/Text';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';
import {CommonColors, Fonts, CommonStyles} from '../../utils/CommonStyles';
import BackButton from '../../components/BackButton';
import Header from '../../components/Header';
import {getDateTime} from '../../utils/Filter';

const renderHeader = (title) => {
  return (
    <Header
      left={<BackButton />}
      center={
        <Text style={[CommonStyles.headerTitle, styles.header]}>{title}</Text>
      }
    />
  );
};

function HomeItem({navigation, route}) {
  const data = route?.params?.value;
  const arrData = _.map(data.data, (val, key) => ({key, val}));

  return (
    <View style={styles.container}>
      {renderHeader(data.headerTitle)}
      <FlatList
        style={styles.list}
        data={arrData}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('WebviewScreen', {linkUrl: item.val.link});
            }}>
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{item.val.title}</Text>
              <FastImage
                style={styles.itemImage}
                source={{uri: item.val.image}}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Text style={styles.domainText}>{item.val.domain}</Text>
              <Text style={styles.itemContent}>{item.val.description}</Text>

              <Text style={styles.itemTime}>
                {getDateTime(item.val.timestamp)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => `${item.id}_${index}`}
      />
    </View>
  );
}

export default HomeItem;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  header: {
    textTransform: 'uppercase',
    color: CommonColors.primaryText,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    padding: '10@s',
    marginTop: '1@s',
    backgroundColor: '#FFF',
    paddingBottom: '10@s',
  },
  itemTitle: {
    fontSize: '14@ms',
    color: CommonColors.mainText,
    ...Fonts.defaultBold,
    marginVertical: '10@s',
  },
  itemImage: {
    height: '150@s',
    width: '100%',
    borderRadius: '5@s',
  },
  itemContent: {
    fontSize: '14@ms',
    color: CommonColors.mainText,
    ...Fonts.defaultRegular,
    marginVertical: '10@s',
  },
  itemTime: {
    fontSize: '12@ms',
    color: 'rgba(75, 75, 75, 0.8)',
    ...Fonts.defaultRegular,
  },
  domainText: {
    fontSize: '14@ms',
    color: CommonColors.indicatorColor,
    ...Fonts.defaultRegular,
    marginTop: '10@s',
    textTransform: 'uppercase',
  },
});
