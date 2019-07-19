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
import NoticeScreen from '../screens/main/tabs/profile/components/Notice';
import NoticeDetailScreen from '../screens/main/tabs/profile/components/NoticeDetail';
import FAQScreen from '../screens/main/tabs/profile/components/FAQ';
import FAQDetailScreen from '../screens/main/tabs/profile/components/FAQdetail';
import MainHeader from "../screens/main/components/MainHeader";

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
          marginTop: 15,
          paddingBottom: 15,
        },
        headerLeft: (
          <Text style={{marginLeft: 10, fontSize: 24, fontWeight: 'bold'}}>셀럽들의 놀이터</Text>
        ),
        headerRight: <MainHeader />
      }
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
  tabBarOptions: {
    activeTintColor:'#ed3847',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-home'
          : 'md-home'
      }
    />
  ),
};

const ReviewsStack = createStackNavigator(
    {
      ReviewList:{
        screen: ReviewListScreen,
        navigationOptions: {
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: 'transparent',
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
            borderBottomWidth: 0,
            marginTop: 15,
            paddingBottom: 15,
          },
          headerLeft: (
          <Text style={{marginLeft: 10, fontSize: 24, fontWeight: 'bold'}}>리뷰</Text>
          ),
          headerRight: <MainHeader />
        }
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
  tabBarOptions: {
    activeTintColor:'#ed3847',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-brush' : 'md-brush'}
    />
  ),
};

const SettingsStack = createStackNavigator(
  {
    Settings: {
      screen: SettingScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: 'transparent',
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
          borderBottomWidth: 0,
          marginTop: 15,
          paddingBottom: 15,
        },
        headerLeft: (
        <Text style={{marginLeft: 10, fontSize: 24, fontWeight: 'bold'}}>더보기</Text>
        ),
        headerRight: <MainHeader />
      }
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
    Notice: {
      screen: NoticeScreen,
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
        title:'notice',
        headerTintColor:'#000'
      }
    },
    NoticeDetail: {
      screen: NoticeDetailScreen,
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
        headerTintColor:'#000'
      }
    },
    FAQ: {
      screen: FAQScreen,
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
        title:'faq',
        headerTintColor:'#000'
      }
    },
    FAQDetail: {
      screen: FAQDetailScreen,
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
  tabBarOptions: {
    activeTintColor:'#ed3847',
  },
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
