import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/welcomeScreen';
import {AppTabNavigator} from './components/appTabNavigator';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {AppDrawerNavigator} from './components/appDrawerNavigator';

export default function App() {
  return (
    <AppContainer/>
  );
}
const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  Drawer:{screen:AppDrawerNavigator},
  BottomTab:{screen:AppTabNavigator}
})
const AppContainer = createAppContainer(SwitchNavigator)