import React, {useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';

import Text from '../../components/Text';
import Header from '../../components/Header';
import {CommonStyles, CommonColors, CommonSize} from '../../utils/CommonStyles';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import ReloadIcon from '../../../assets/svg/ic_reload.svg';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';
import MenuIcon from '../../../assets/svg/ic_menu.svg';
import SearchIcon from '../../../assets/svg/ic_search.svg';

const renderHeader = () => {
  return (
    <Header
      left={
        <Text style={[CommonStyles.headerTitle, styles.header]}>
          {I18n.t('FollowScreen.header')}
        </Text>
      }
      right={<ReloadIcon color={'#989898'} width={20} height={20} />}
    />
  );
};

const renderItem = (item, index, navigation, feeds) => {
  const data = feeds[`${item}`];
  const arrData = _.map(data, (val, key) => ({key, val}));
  const thumbnai = arrData.length > 0 ? arrData[0].val.image : null;

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        navigation.navigate('FollowCard', {
          value: item,
        });
      }}>
      <View>
        {!thumbnai ? (
          <Image
            style={styles.thumbnai}
            source={require('../../../assets/images/img_placeholder.png')}
          />
        ) : (
          <Image style={styles.thumbnai} source={{uri: thumbnai}} />
        )}
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={[
            'rgba(0, 0, 0, 0.8)',
            'rgba(0, 0, 0, 0.2)',
            'rgba(238, 238, 238, 0.1)',
          ]}
          style={styles.linearGradient}
        />
        <View style={[styles.row, styles.itemHeader]}>
          <Text style={styles.title}>{item}</Text>
          <MenuIcon width={15} height={15} color={'#f8f8f8'} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

function FollowScreen({navigation, value}) {
  const feeds = _.get(value, 'feeds', {});
  const data = Object.keys(feeds);

  return (
    <View style={styles.container}>
      {renderHeader()}
      {/* search keywords */}
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('FollowSearch');
        }}>
        <View style={styles.searchContainer}>
          <SearchIcon
            width={20}
            height={20}
            color={CommonColors.inActiveTintColor}
          />
          <Text style={styles.textEnter}>
            {I18n.t('FollowScreen.hintSearch')}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      {/* list feeds */}
      <FlatList
        style={styles.flexOne}
        data={data}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={({item, index}) =>
          renderItem(item, index, navigation, feeds)
        }
        numColumns={2}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

export default connect((state) => ({
  value: state.feeds,
}))(FollowScreen);

const {width, height} = Dimensions.get('window');
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    textTransform: 'uppercase',
    color: CommonColors.primaryText,
  },
  flexOne: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    height: width / 2 - 5,
    margin: 1,
  },
  thumbnai: {
    width: '100%',
    height: '100%',
  },
  separator: {
    width: 1,
  },
  row: {
    flexDirection: 'row',
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    zIndex: 100,
    position: 'absolute',
    top: 0,
  },
  itemHeader: {
    position: 'absolute',
    top: 0,
    padding: scale(10),
    zIndex: 1000,
    width: '100%',
    height: '40@s',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: '16@ms',
    color: '#f8f8f8',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    marginVertical: '10@s',
    marginHorizontal: '16@s',
    backgroundColor: CommonColors.lightSeparator,
    height: '40@s',
    alignItems: 'center',
    paddingHorizontal: '16@s',
    borderRadius: '4@s',
  },
  textEnter: {
    fontSize: '14@ms',
    color: CommonColors.inActiveTintColor,
    marginLeft: '16@s',
    flex: 1,
  },
});
