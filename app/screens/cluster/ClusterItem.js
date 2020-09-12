import React, {useEffect, useState} from 'react';
import {View, Switch, Image, TouchableOpacity, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
import Axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import Text from '../../components/Text';
import Header from '../../components/Header';
import {CommonStyles, CommonColors, Fonts} from '../../utils/CommonStyles';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import SettingIcon from '../../../assets/svg/ic_settings';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';
import AvatarIcon from '../../../assets/svg/ic_avatar_user.svg';
import BackButton from '../../components/BackButton';
import {getDateTime} from '../../utils/Filter';

export default (props) => {
  const clusterName = props?.route?.params?.name;
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const res = await Axios.get(
        `https://newscard9497.herokuapp.com/clusters/${clusterName}`,
      );
      setData(res?.data?.result);
    } catch (error) {
      console.log('get cluster_name error', error);
    }
  };
  useEffect(() => {
    if (data.length === 0) {
      loadData();
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Header
        left={<BackButton />}
        center={
          <Text style={[CommonStyles.headerTitle, styles.header]}>
            {I18n.t('ClusterScreen.header')}
          </Text>
        }
      />
      {data?.length > 0 ? (
        <FlatList
          style={styles.list}
          data={data}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate('WebviewScreen', {linkUrl: item.link});
              }}>
              <View style={styles.itemContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <FastImage
                  style={styles.itemImage}
                  source={{uri: item.image}}
                  resizeMode={FastImage.resizeMode.cover}
                />
                {/* <Text style={styles.domainText}>{item.domain}</Text> */}
                <Text style={styles.itemContent}>{item.description}</Text>

                <Text style={styles.itemTime}>
                  {getDateTime(item.timestamp)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => `${item.id}_${index}`}
        />
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
    color: CommonColors.activeTintColor,
    ...Fonts.defaultRegular,
    marginTop: '10@s',
    textTransform: 'uppercase',
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
