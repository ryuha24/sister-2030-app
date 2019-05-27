import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CampaignListScreen from '../screens/main/tabs/campaigns/components/CampaignList';
import CampaignDetailScreen from '../screens/main/tabs/campaigns/components/CampaignDetail';
import ReviewListScreen from '../screens/main/tabs/reviews/components/ReviewList';
import SettingScreen from '../screens/main/tabs/profile/components/Setting';
import MyPageScreen from '../screens/main/tabs/profile/components/MyPage';

const window = Dimensions.get('window');
const headerHeight = window.height/11;

const CampaignsStack = createStackNavigator(
  {
    CampaignList: CampaignListScreen,
    CampaignDetail: CampaignDetailScreen,

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
      ReviewList: ReviewListScreen,
      MyPage: MyPageScreen
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
    Settings: SettingScreen,
    MyPage: MyPageScreen
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
  SettingsStack,
});
