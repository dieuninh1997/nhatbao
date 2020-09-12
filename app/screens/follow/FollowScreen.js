import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

import Text from '../../components/Text';
import Header from '../../components/Header';
import {CommonStyles, CommonColors} from '../../utils/CommonStyles';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';
import store from '../../store';
import * as actions from '../../actions';
import {useNavigation} from '@react-navigation/native';

export default function FollowScreen(props) {
  const feeds = useSelector((state) => state.feeds.feeds);
  const gender = useSelector((state) => state.user.gender);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // if (_.isEmpty(feeds)) {
    store.dispatch(actions.fetchAllFeeds());
    // }
  }, [feeds]);

  let genderFeeds = !_.isEmpty(feeds) ? feeds[`${gender}`] : [];
  if (gender === 'male') {
    genderFeeds = Object.assign(genderFeeds, feeds.female, feeds?.neutral);
  } else if (gender === 'female') {
    genderFeeds = Object.assign(genderFeeds, feeds?.male, feeds?.neutral);
  } else {
    genderFeeds = Object.assign(genderFeeds, feeds?.female, feeds?.male);
  }

  const renderItem = ({item, index}) => {
    const thumbnai = genderFeeds[`${item}`];

    return (
      <TouchableOpacity
        keys={index}
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
            <Text style={styles.title}>{I18n.t(`FollowScreen.${item}`)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    return (
      <Header
        left={
          <Text style={[CommonStyles.headerTitle, styles.header]}>
            {I18n.t('FollowScreen.header')}
          </Text>
        }
      />
    );
  };

  const _onRefresh = () => {
    setRefreshing(true);
    store.dispatch(actions.fetchAllFeeds());
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {_.isEmpty(feeds) ? (
        <View style={styles.loadingContainer}>
          <LottieView
            style={styles.loadingIcon}
            source={require('../../../assets/animations/row_loading.json')}
            autoPlay
            loop
          />
        </View>
      ) : (
        <View style={styles.content}>
          <FlatList
            style={styles.flexOne}
            data={genderFeeds ? Object.keys(genderFeeds) : []}
            keyExtractor={(item, index) => `${item.id}_${index}`}
            renderItem={renderItem}
            numColumns={2}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            onRefresh={_onRefresh}
            refreshing={refreshing}
          />
        </View>
      )}
    </View>
  );
}

const {width} = Dimensions.get('window');
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
    marginBottom: '20@s',
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
  loadingContainer: {
    flex: 1,
    marginTop: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loadingIcon: {
    width: '100@s',
    height: '100@s',
    alignSelf: 'center',
  },
});
