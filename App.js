import React from 'react';
import AccountScreen from './app/screens/account/AccountScreen';
import HomeScreen from './app/screens/home/HomeScreen';
import ExploreScreen from './app/screens/explore/ExploreScreen';
import FollowScreen from './app/screens/follow/FollowScreen';
import NotificationScreen from './app/screens/notification/NotificationScreen';
import SplashScreen from './app/screens/splash/SplashScreen';
import {scale} from './app/libs/reactSizeMatter/scalingUtils';
import {CommonColors} from './app/utils/CommonStyles';
import HomeIcon from './assets/svg/ic_home.svg';
import NotificationIcon from './assets/svg/ic_bell.svg';
import FollowIcon from './assets/svg/ic_follow.svg';
import ExploreIcon from './assets/svg/ic_search.svg';
import AccountIcon from './assets/svg/ic_user.svg';
import store from './app/store';
import WebviewScreen from './app/components/WebviewScreen';
import FollowItem from './app/screens/follow/FollowItem';
import HomeItem from './app/screens/home/HomeItem';

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
          // tabBarLabel: ({focused}) => (
          //   <LabelComponent title="Follow" focused={focused} />
          // ),
          tabBarIcon: ({focused}) =>
            focused ? (
              <FollowIcon color={CommonColors.activeTintColor} />
            ) : (
              <FollowIcon color={CommonColors.inActiveTintColor} />
            ),
        }}
      />
      <Tab.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{
          // tabBarLabel: ({focused}) => (
          //   <LabelComponent title="Explore" focused={focused} />
          // ),
          tabBarIcon: ({focused}) =>
            focused ? (
              <ExploreIcon color={CommonColors.activeTintColor} />
            ) : (
              <ExploreIcon color={CommonColors.inActiveTintColor} />
            ),
        }}
      />
      {/*  <Tab.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          // tabBarLabel: ({focused}) => (
          //   <LabelComponent title="Notification" focused={focused} />
          // ),
          tabBarIcon: ({focused}) =>
            focused ? (
              <NotificationIcon
                color={CommonColors.activeTintColor}
                width={20}
                height={20}
              />
            ) : (
              <NotificationIcon
                color={CommonColors.inActiveTintColor}
                width={20}
                height={20}
              />
            ),
        }}
      />
     <Tab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          // tabBarLabel: ({focused}) => (
          //   <LabelComponent title="Account" focused={focused} />
          // ),
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
      /> */}
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
      <Stack.Screen name="FollowItem" component={FollowItem} />
      <Stack.Screen name="WebviewScreen" component={WebviewScreen} />
      <Stack.Screen name="HomeItem" component={HomeItem} />
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
