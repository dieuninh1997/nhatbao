import React, {useState, useEffect} from 'react';
import {View, TextInput, FlatList, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import LottieView from 'lottie-react-native';

import Text from '../../components/Text';
import Header from '../../components/Header';
import {CommonColors, Fonts, CommonStyles} from '../../utils/CommonStyles';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import {getDiffHours} from '../../utils/Filter';
import store from '../../store';
import * as actions from '../../actions';
import CloseIcon from '../../../assets/svg/ic_close.svg';
import SearchIcon from '../../../assets/svg//ic_search.svg';
import {useNavigation} from '@react-navigation/native';
import Axios from 'axios';

export default function FollowSearch(props) {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [isShowSuggestDomain, setShowSuggestDomain] = useState(true);
  const [dataSearch, setDataSearch] = useState([]);
  const domain = useSelector((state) => state.domain.domain); // _.get(value, 'domain', {});

  useEffect(() => {
    if (_.isEmpty(domain)) {
      store.dispatch(actions.fetchAllDomain());
    }
  }, [domain]);

  if (!_.isEmpty(domain)) {
    domain.sort((a, b) => {
      return a.domain.localeCompare(b.domain);
    });
  }

  const handleSearch = async (text) => {
    handleChangeInput(text);
    setShowSuggestDomain(false);
    try {
      const res = await Axios.get(
        `https://newscard9497.herokuapp.com/domain/${text}`,
      );
      if (res) {
        setDataSearch(res?.data?.result);
      }
    } catch (error) {
      console.log('================================================');
      console.log('search domain error', error);
      console.log('================================================');
    }
  };

  const getArticles = (kd) => {
    for (let index in domain) {
      const obj = domain[index];

      if (obj.domain === kd) {
        return obj.articles.sort((a, b) => {
          return b.timestamp - a.timestamp;
        });
      }
    }
  };

  const handleChangeInput = (value) => {
    setSearchText(value);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('WebviewScreen', {linkUrl: item.link});
        }}>
        <View key={index} style={styles.itemRow}>
          <FastImage
            source={{uri: item.image}}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.itemContent}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemTime}>{getDiffHours(item.timestamp)}</Text>
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
            {I18n.t('FollowSearch.header')}
          </Text>
        }
      />
    );
  };
  const renderItemDomain = ({item, index}) => (
    <TouchableOpacity key={index} onPress={() => handleSearch(item.domain)}>
      <View style={styles.itemContainer}>
        {item.images ? (
          <View style={styles.kdImageContainer}>
            <FastImage
              source={{uri: item.images}}
              style={styles.kdImage}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        ) : null}
        <Text style={styles.domainText}>{item.domain}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}

      <View style={styles.searchContainer}>
        <SearchIcon
          width={20}
          height={20}
          color={CommonColors.activeTintColor}
        />
        <TextInput
          value={searchText}
          style={styles.textEnter}
          placeholder={I18n.t('FollowSearch.hintSearch')}
          onChangeText={handleChangeInput}
        />
        {searchText ? (
          <TouchableOpacity
            onPress={() => {
              setSearchText('');
              setShowSuggestDomain(true);
            }}>
            <CloseIcon
              width={15}
              height={15}
              color={CommonColors.inActiveTintColor}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.separator} />
      <View style={styles.content}>
        {isShowSuggestDomain ? (
          <ScrollView contentContainerStyle={{flex: 1}}>
            <View style={styles.domainContainer}>
              <Text style={styles.headerTitle}>
                {I18n.t('FollowScreen.domain')}
              </Text>
              <View style={styles.separatorDark} />
              {!_.isEmpty(domain) ? (
                <View style={styles.listDomain}>
                  <FlatList
                    numColumns={3}
                    data={domain}
                    renderItem={renderItemDomain}
                    keyExtractor={(item, index) => `${item.id}_${index}`}
                  />
                </View>
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
          </ScrollView>
        ) : (
          <View style={styles.resultContainer}>
            <FlatList
              data={dataSearch}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item.id}_${index}`}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    textTransform: 'uppercase',
    color: CommonColors.primaryText,
  },
  separator: {
    height: 1,
    backgroundColor: CommonColors.lightBgColor,
  },
  separatorDark: {
    height: 1,
    backgroundColor: CommonColors.activeTintColor,
  },
  searchContainer: {
    flexDirection: 'row',
    height: '45@s',
    alignItems: 'center',
    paddingHorizontal: '16@s',
  },
  content: {
    flex: 1,
    padding: '10@s',
    marginTop: '16@s',
  },
  textEnter: {
    fontSize: '14@ms',
    color: CommonColors.inActiveTintColor,
    flex: 1,
    marginLeft: '10@s',
  },
  headerTitle: {
    fontSize: '14@ms',
    color: CommonColors.activeTintColor,
    textTransform: 'uppercase',
    marginBottom: '8@s',
  },
  domainText: {
    fontSize: '14@ms',
    color: '#000',
    marginTop: '5@s',
  },
  itemContainer: {
    width: '120@s',
    height: '120@s',
    borderRadius: '60@s',
    backgroundColor: CommonColors.lightBgColor,
    margin: '5@s',
    paddingVertical: '5@s',
    paddingHorizontal: '10@s',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  listDomain: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    marginTop: '10@s',
  },
  domainContainer: {
    flex: 1,
  },
  resultContainer: {
    flex: 1,
  },
  itemRow: {
    flexDirection: 'row',
    marginTop: '10@s',
  },
  image: {
    height: '80@s',
    width: '100@s',
    backgroundColor: '#dddeef',
    borderRadius: '10@s',
  },
  itemContent: {
    flex: 1,
    flexWrap: 'nowrap',
    marginLeft: '10@s',
  },
  itemTitle: {
    color: '#000',
    fontSize: 13,
  },
  itemTime: {
    fontSize: '12@ms',
    color: '#424949',
    ...Fonts.defaultRegular,
    marginTop: '5@s',
  },
  kdImage: {
    flex: 1,
  },
  kdImageContainer: {
    width: '80@s',
    height: '30@s',
    borderRadius: '8@s',
    marginRight: '10@s',
    overflow: 'hidden',
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
