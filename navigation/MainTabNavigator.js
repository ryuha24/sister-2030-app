import React from 'react';
import {Platform, Dimensions, Text, TouchableOpacity, Image} from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import CampaignListScreen from '../screens/main/tabs/campaigns/components/CampaignList';
import CampaignDetailScreen from '../screens/main/tabs/campaigns/components/CampaignDetail';
import ReviewListScreen from '../screens/main/tabs/reviews/components/ReviewList';
import ReviewDetailScreen from '../screens/main/tabs/reviews/components/ReviewDetail';
import SettingScreen from '../screens/main/tabs/profile/components/Setting';
import MyPageScreen from '../screens/main/tabs/profile/components/MyPage';
import MainHeader from "../screens/main/components/MainHeader";

const window = Dimensions.get('window');
const headerHeight = window.height/11;

const CampaignsStack = createStackNavigator(
  {
    CampaignList:{
      screen: CampaignListScreen
    },
    CampaignDetail: {
      screen: CampaignDetailScreen,
      navigatorStyle: {
        navBarHidden: false,
      },
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: 'transparent',
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
          borderBottomWidth: 0,
          marginTop:15,
          paddingBottom:15,
        },
        title:'캠페인',
        headerTintColor:'#000'
      }
    },

  },
  {
    initialRouteName: 'CampaignList',
    navigationOptions: {
      height: headerHeight,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);

CampaignsStack.navigationOptions = {
  tabBarLabel: '캠페인',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const ReviewsStack = createStackNavigator(
    {
      ReviewList:{
        screen: ReviewListScreen
      },
      ReviewDetail: {
        screen: ReviewDetailScreen,
        navigatorStyle: {
          navBarHidden: false,
        },
        navigationOptions: {
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: 'transparent',
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
            borderBottomWidth: 0,
            marginTop:15,
            paddingBottom:15,
          },
          title:'리뷰상세',
          headerTintColor:'#000'
        }
      },
    },
    {
      initialRouteName: 'ReviewList',
      navigationOptions: {
        height: headerHeight,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    }
);

ReviewsStack.navigationOptions = {
  tabBarLabel: '리뷰',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator(
  {
    Settings: {
      screen: SettingScreen
    },
    MyPage: {
      screen: MyPageScreen,
      navigatorStyle: {
        navBarHidden: false,
      },
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: 'transparent',
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
          borderBottomWidth: 0,
          marginTop:15,
          paddingBottom:15,
        },
        title:'내정보',
        headerTintColor:'#000'
      }
    },
  },
  {
    initialRouteName: 'Settings',
    navigationOptions: {
      height: headerHeight,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);

SettingsStack.navigationOptions = {
  tabBarLabel: '더보기',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  CampaignsStack,
  ReviewsStack,
  SettingsStack
});
