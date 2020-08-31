import React, {useState} from 'react';
import {View, TextInput, FlatList} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';

import Text from '../../components/Text';
import {CommonColors, CommonSize, Fonts} from '../../utils/CommonStyles';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import I18n from '../../i18n/i18n';
import BackButton from '../../components/BackButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import {getDiffHours} from '../../utils/Filter';

function FollowSearch({navigation, value}) {
  const [searchText, setSearchText] = useState('');
  const [isShowSuggestDomain, setShowSuggestDomain] = useState(true);
  const domain = _.get(value, 'domain', {});
  const keyDomain = [];
  domain?.map((k) => {
    keyDomain.push(k.domain);
  });

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
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <BackButton />
        {/* <SearchIcon
          width={20}
          height={20}
          color={CommonColors.inActiveTintColor}
        /> */}
        <TextInput
          value={searchText}
          style={styles.textEnter}
          placeholder={I18n.t('FollowScreen.hintSearch')}
          onChangeText={handleChangeInput}
        />
      </View>
      <View style={styles.separator} />
      <View style={styles.content}>
        {isShowSuggestDomain ? (
          <View style={styles.domainContainer}>
            <Text style={styles.headerTitle}>
              {I18n.t('FollowScreen.domain')}
            </Text>
            <View style={styles.separatorDark} />
            <View style={styles.listDomain}>
              {keyDomain.map((kd, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      handleChangeInput(kd);
                      setShowSuggestDomain(false);
                    }}>
                    <View style={styles.itemContainer}>
                      <Text style={styles.domainText}>{`${kd}`}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ) : (
          <View style={styles.resultContainer}>
            <FlatList
              data={getArticles(searchText) || []}
              renderItem={renderItem}
            />
          </View>
        )}
      </View>
    </View>
  );
}

export default connect((state) => ({
  value: state.domain,
}))(FollowSearch);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  separator: {
    height: 1,
    backgroundColor: CommonColors.lightBgColor,
  },
  separatorDark: {
    height: 1,
    backgroundColor: CommonColors.indicatorColor,
  },
  searchContainer: {
    flexDirection: 'row',
    marginTop: CommonSize.paddingTopHeader,
    height: '45@s',
    alignItems: 'center',
    paddingHorizontal: '16@s',
  },
  content: {
    flex: 1,
    padding: '10@s',
  },
  textEnter: {
    fontSize: '14@ms',
    color: CommonColors.inActiveTintColor,
    marginLeft: '16@s',
    flex: 1,
  },
  headerTitle: {
    fontSize: '14@ms',
    color: CommonColors.indicatorColor,
    textTransform: 'uppercase',
    marginBottom: '8@s',
  },
  domainText: {
    fontSize: '14@ms',
    color: '#000',
  },
  itemContainer: {
    borderRadius: '16@s',
    backgroundColor: CommonColors.lightBgColor,
    margin: '5@s',
    paddingVertical: '5@s',
    paddingHorizontal: '10@s',
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
});
