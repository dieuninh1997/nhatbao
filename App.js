import React from 'react';
import AccountScreen from './app/screens/account/AccountScreen';
import HomeScreen from './app/screens/home/HomeScreen';
import FollowScreen from './app/screens/follow/FollowScreen';
import SplashScreen from './app/screens/splash/SplashScreen';
import {CommonColors} from './app/utils/CommonStyles';
import HomeIcon from './assets/svg/ic_home.svg';
import FollowIcon from './assets/svg/ic_follow.svg';
import AccountIcon from './assets/svg/ic_user.svg';
import store from './app/store';
import WebviewScreen from './app/components/WebviewScreen';
import HomeItem from './app/screens/home/HomeItem';
import SettingScreen from './app/screens/setting/SettingScreen';
import FollowCard from './app/screens/follow/FollowCard';
import FollowSearch from './app/screens/follow/FollowSearch';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LabelComponent from './app/components/LabelComponent';
import {Provider} from 'react-redux';
import {RootSiblingParent} from 'react-native-root-siblings';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={'HomeScreen'}
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
