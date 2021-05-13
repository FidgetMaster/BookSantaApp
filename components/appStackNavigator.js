import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import ReceiverDetailsScreen from '../screens/recieverDetailsScreen';
import BookDonateScreen from '../screens/bookDonateScreen';

export const AppStackNavigator = createStackNavigator({
    BookDonateList : {
      screen : BookDonateScreen,
      navigationOptions:{
        headerShown : false
      }
    },
    ReceiverDetails : {
      screen : RecieverDetailsScreen,
      navigationOptions:{
        headerShown : false
      }
    }
  },
    {
      initialRouteName: 'BookDonateList'
    }
  );