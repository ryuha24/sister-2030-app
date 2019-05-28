import React from 'react';
import {Platform, Dimensions, Text, TouchableOpacity, Image} from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import CampaignListScreen from '../screens/main/tabs/campaigns/components/CampaignList';
import CampaignDetailScreen from '../screens/main/tabs/campaigns/components/CampaignDetail';
import ReviewListScreen from '../screens/main/tabs/reviews/components/ReviewList';
import SettingScreen from '../screens/main/tabs/profile/components/Setting';
import MyPageScreen from '../screens/main/tabs/profile/components/MyPage';

const window = Dimensions.get('window');
const headerHeight = window.height/11;

const CampaignsStack = createStackNavigator(
  {
    CampaignList:{
      screen: CampaignListScreen,
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
        headerLeft: (
        <Text style={{marginLeft: 10, fontSize:24, fontWeight: 'bold'}}>셀럽들의 놀이터</Text>
        ),
        headerRight:(
        <TouchableOpacity onPress={this._moveMyPage} style={{right: Platform.OS === 'ios' ? Dimensions.get("window").height < 667 ?  '10%' : '5%' : '25%', backgroundColor: 'transparent', paddingLeft: 15, marginRight:10,}}>
          <Image style={{width: 40, height: 40, borderRadius:20,}} source={{uri:'https://instagram.ficn2-1.fna.fbcdn.net/vp/f54eadce17f495e92c8fad5360f58098/5D655586/t51.2885-19/s150x150/11821094_185810741751051_1102813722_a.jpg?_nc_ht=instagram.ficn2-1.fna.fbcdn.net'}}/>
        </TouchableOpacity>
        ),
      }
    },
    CampaignDetail: {
      screen: CampaignDetailScreen,
      navigatorStyle: {
        navBarHidden: false,
      },
      navigationOptions: {
        title:'상세보기',
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
