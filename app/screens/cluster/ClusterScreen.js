import React, {useState, useEffect} from 'react';
import {
  View,
  Switch,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import _ from 'lodash';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

import Text from '../../components/Text';
import Header from '../../components/Header';
import {CommonStyles, CommonColors, Fonts} from '../../utils/CommonStyles';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import SettingIcon from '../../../assets/svg/ic_settings';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';
import AvatarIcon from '../../../assets/svg/ic_avatar_user.svg';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import store from '../../store';
import * as actions from '../../actions';

export default (props) => {
  const navigation = useNavigation();
  const cluster = useSelector((state) => state.cluster.cluster);

  const [refreshing, setRefreshing] = useState(false);
  const [arrCluster, setArrCluster] = useState([]);
  useEffect(() => {
    store.dispatch(actions.fetchAllCluster());

    if (!_.isEmpty(cluster)) {
      const res = _.values(cluster);
      setArrCluster(res);
    }
  }, [cluster]);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          navigation.navigate('ClusterItem', {name: `cluster::${index + 1}`});
        }}
        style={[
          styles.itemContainer,
          index % 2 === 0 ? {paddingLeft: scale(4)} : {paddingRight: scale(4)},
        ]}>
        <FastImage
          source={{uri: item.image}}
          style={styles.itemImage}
          resizeMode={FastImage.resizeMode.cover}
        />

        <View
          style={[
            styles.titleContainer,
            {
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              margin: scale(2),
            },
            index % 2 === 0 ? {marginLeft: scale(4)} : {marginRight: scale(4)},
          ]}>
          {index % 2 === 0 && <View style={styles.borderTop} />}
          <Text style={[styles.titleText]}>{item.title}</Text>
          {index % 2 !== 0 && <View style={styles.borderBottom} />}
        </View>
      </TouchableOpacity>
    );
  };

  const _onRefresh = () => {
    setRefreshing(true);
    store.dispatch(actions.fetchAllCluster());
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  const renderList = () => {
    const data = arrCluster.length > 0 && arrCluster.slice(1);
    return (
      <FlatList
        data={data}
        ListHeaderComponent={renderTopView()}
        renderItem={renderItem}
        numColumns={2}
        style={{flex: 1}}
        onRefresh={_onRefresh}
        refreshing={refreshing}
      />
    );
  };

  const renderTopView = () => {
    const topView = arrCluster.length > 0 && arrCluster.slice(0, 1)[0];

    if (topView) {
      return (
        <TouchableOpacity
          style={styles.topContainer}
          onPress={() => {
            navigation.navigate('ClusterItem', {name: 'cluster::0'});
          }}>
          <FastImage
            source={{uri: topView.image}}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
          />
          <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            colors={[
              'rgba(0, 0, 0, 0.8)',
              'rgba(0, 0, 0, 0.2)',
              'rgba(238, 238, 238, 0.1)',
            ]}
            style={styles.linearGradient}
          />
          <View style={styles.titleContainer}>
            <View style={styles.borderTop} />
            <Text style={[styles.topTitle]}>{topView.title}</Text>
            <View style={styles.borderBottom} />
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Header
        left={
          <Text style={[CommonStyles.headerTitle, styles.header]}>
            {I18n.t('ClusterScreen.header')}
          </Text>
        }
      />
      {arrCluster.length > 0 ? (
        <View style={styles.content}>{renderList()}</View>
      ) : (
        <View style={styles.loadingContainer}>
          <LottieView
            style={styles.loadingIcon}
            source={require('../../../assets/animations/row_loading.json')}
            autoPlay
            loop
          />
        </View>
      )}
    </View>
  );
};

const {height} = Dimensions.get('window');

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    textTransform: 'uppercase',
    color: CommonColors.primaryText,
  },
  content: {
    flex: 1,
  },
  image: {
    // flex: 1,
    width: '100%',
    height: height * 0.3,
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  topTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    paddingHorizontal: 10,
  },
  titleText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    paddingHorizontal: 10,
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    position: 'absolute',
    top: 0,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
    padding: 10,
  },
  borderTop: {
    width: 10,
    height: 10,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderTopColor: CommonColors.activeTintColor,
    borderLeftColor: CommonColors.activeTintColor,
  },
  borderBottom: {
    width: 10,
    height: 10,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderBottomColor: CommonColors.activeTintColor,
    borderRightColor: CommonColors.activeTintColor,
    alignSelf: 'flex-end',
  },
  topContainer: {
    flex: 1,
    marginBottom: scale(2),
  },
  itemContainer: {
    flex: 1,
    height: scale(150),
    padding: scale(2),
  },
  itemImage: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    marginTop: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIcon: {
    width: '100@s',
    height: '100@s',
    alignSelf: 'center',
  },
});
