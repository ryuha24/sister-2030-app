import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import AccountNavigator from './AccountNavigator';
import MainTabNavigator from './MainTabNavigator';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Account:{
    screen: AccountNavigator,
    navigationOptions: {
      header: null,
    }
  },
  Main: {
    screen: MainTabNavigator,
    navigationOptions: {
      header: null
    }
  },
  initialRouteName: "Account"
});