import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import {WebView} from 'react-native-webview';

import ScaledSheet from '../libs/reactSizeMatter/ScaledSheet';
import {CommonColors} from '../utils/CommonStyles';
import Header from './Header';
import MenuIcon from '../../assets/svg/ic_menu.svg';
import BookmarkIcon from '../../assets/svg/ic_bookmark.svg';
import CommentIcon from '../../assets/svg/ic_comment.svg';
import HeartIcon from '../../assets/svg/ic_heart.svg';
import PlusIcon from '../../assets/svg/ic_plus.svg';
import ShareIcon from '../../assets/svg/ic_share.svg';
import BackButton from './BackButton';

function WebviewScreen({navigation, route, netInfo}, props) {
  const link = route?.params?.linkUrl;
  return (
    <View style={styles.container}>
      <Header
        left={<BackButton />}
        right={
          <View style={styles.row}>
            <ShareIcon width={18} height={18} color={'#000'} />
            {/* <View style={styles.space} />
            <PlusIcon width={18} height={18} color={'#000'} />
            <View style={styles.space} />
            <HeartIcon width={18} height={18} color={'#000'} />
            <View style={styles.space} />
            <CommentIcon width={18} height={18} color={'#000'} />
            <View style={styles.space} />
            <BookmarkIcon width={18} height={18} color={'#000'} />
            <View style={styles.space} />
            <MenuIcon width={18} height={18} color={'#000'} /> */}
          </View>
        }
      />
      <View style={styles.content}>
        {!netInfo.isConnected ? null : (
          <WebView
            startInLoadingState
            useWebKit
            source={{
              uri: link,
            }}
            bounces={false}
            style={{flex: 1}}
            textZoom={100}
          />
        )}
      </View>
    </View>
  );
}

export default connect((state) => ({
  netInfo: state.netInfo,
}))(WebviewScreen);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonColors.hintColor,
  },
  row: {
    flexDirection: 'row',
  },
  space: {
    width: '20@s',
  },
  content: {
    flex: 1,
    backgroundColor: CommonColors.bgColor,
    marginTop: 1,
  },
});
