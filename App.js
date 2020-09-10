import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import {RootSiblingParent} from 'react-native-root-siblings';

import {CommonColors} from './app/utils/CommonStyles';
import HomeIcon from './assets/svg/ic_home.svg';
import FollowIcon from './assets/svg/ic_follow.svg';
import AccountIcon from './assets/svg/ic_user.svg';
import SearchIcon from './assets/svg/ic_search.svg';
import ClusterIcon from './assets/svg/ic_cluster.svg';
import store from './app/store';
import LabelComponent from './app/components/LabelComponent';
//screens
import WebviewScreen from './app/components/WebviewScreen';
import HomeItem from './app/screens/home/HomeItem';
import SettingScreen from './app/screens/setting/SettingScreen';
import FollowCard from './app/screens/follow/FollowCard';
import FollowSearch from './app/screens/follow/FollowSearch';
import ClusterScreen from './app/screens/cluster/ClusterScreen';
import ClusterItem from './app/screens/cluster/ClusterItem';
import AccountScreen from './app/screens/account/AccountScreen';
import HomeScreen from './app/screens/home/HomeScreen';
import FollowScreen from './app/screens/follow/FollowScreen';
import SplashScreen from './app/screens/splash/SplashScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={'ClusterScreen'}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: CommonColors.activeTintColor,
        style: {
          backgroundColor: CommonColors.tabbar,
          shadowColor: '#b1b1b1',
          shadowOpacity: 0.2,
          shadowOffset: {
            width: 0,
            height: -3,
          },
          elevation: 3,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <LabelComponent title="Home" focused={focused} />
          ),
          tabBarIcon: ({focused}) =>
            focused ? (
              <HomeIcon color={CommonColors.activeTintColor} />
            ) : (
              <HomeIcon color={CommonColors.inActiveTintColor} />
            ),
        }}
      />
      <Tab.Screen
        name="FollowScreen"
        component={FollowScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <FollowIcon color={CommonColors.activeTintColor} />
            ) : (
              <FollowIcon color={CommonColors.inActiveTintColor} />
            ),
        }}
      />
      <Tab.Screen
        name="ClusterScreen"
        component={ClusterScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <ClusterIcon
                color={CommonColors.activeTintColor}
                width={30}
                height={30}
              />
            ) : (
              <ClusterIcon
                color={CommonColors.inActiveTintColor}
                width={30}
                height={30}
              />
            ),
        }}
      />
      <Tab.Screen
        name="FollowSearch"
        component={FollowSearch}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <SearchIcon color={CommonColors.activeTintColor} />
            ) : (
              <SearchIcon color={CommonColors.inActiveTintColor} />
            ),
        }}
      />
      <Tab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <AccountIcon
                color={CommonColors.activeTintColor}
                width={20}
                height={20}
              />
            ) : (
              <AccountIcon
                color={CommonColors.inActiveTintColor}
                width={20}
                height={20}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const MyStack = () => {
  return (
    <Stack.Navigator initialRouteName={'SplashScreen'} headerMode={'none'}>
      <Stack.Screen name="MainScreen" component={MyTabs} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="FollowScreen" component={FollowScreen} />
      <Stack.Screen name="WebviewScreen" component={WebviewScreen} />
      <Stack.Screen name="HomeItem" component={HomeItem} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="FollowCard" component={FollowCard} />
      <Stack.Screen name="FollowSearch" component={FollowSearch} />
      <Stack.Screen name="ClusterItem" component={ClusterItem} />
    </Stack.Navigator>
  );
};

const MainScreen = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootSiblingParent>
          <MainScreen />
        </RootSiblingParent>
      </Provider>
    );
  }
}
