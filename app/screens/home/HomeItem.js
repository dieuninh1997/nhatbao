import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';

import _ from 'lodash';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';

import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import Text from '../../components/Text';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';
import {CommonColors, Fonts, CommonStyles} from '../../utils/CommonStyles';
import BackButton from '../../components/BackButton';
import Header from '../../components/Header';
import {getDateTime} from '../../utils/Filter';
import Axios from 'axios';
import {useNavigation} from '@react-navigation/native';

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

export default function HomeItem(props) {
  const {data, headerTitle} = props?.route?.params?.value;
  const navigation = useNavigation();
  const [arrData, setArrData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const res = await Axios.get(
        `https://newscard9497.herokuapp.com/topics/${data}`,
      );
      if (res) {
        setArrData(res?.data?.result);
      }
    } catch (error) {
      console.log('load more topics error', error);
    }
  };

  useEffect(() => {
    if (arrData?.length === 0) {
      loadData();
    }
  }, []);

  const _onRefresh = () => {
    setRefreshing(true);
    loadData();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  return (
    <View style={styles.container}>
      {renderHeader(headerTitle)}
      {arrData?.length > 0 ? (
        <FlatList
          onRefresh={_onRefresh}
          refreshing={refreshing}
          style={styles.list}
          data={arrData}
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
                <Text style={styles.domainText}>{item.domain}</Text>
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
}

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
