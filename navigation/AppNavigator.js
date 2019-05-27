import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Account from '../screens/account/components/Login';
import SignUp from '../screens/account/components/SignUp';
import InstagramCheck from '../screens/account/components/InstagramCheck';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Account: Account,
  SignUp: {
    screen: SignUp,
    navigatorStyle: {
      navBarHidden: false,
    },
    navigationOptions: {
      title:'회원가입',
      headerTintColor:'#000',
    }
  },
  // 인스타 확인하는 화면
  InstagramCheck: {
    screen: InstagramCheck,
    navigatorStyle: {
      navBarHidden: false,
    },
    navigationOptions: {
      title:'인스타 아이디 확인',
      headerTintColor:'#000',
    }
  },
  Main: MainTabNavigator,
  initialRouteName: "Account"
});