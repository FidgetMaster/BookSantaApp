import React,{Component}from 'react';
import { Image } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import BookDonateScreen from '../screens/bookDonateScreen';
import BookRequestScreen from '../screens/bookRequestScreen';

export const AppTabNavigator = createBottomTabNavigator({
    DonateBooks:{screen:BookDonateScreen,
    navigationOptions:{
        tabBarIcon:<Image source = {require('../assets/icon.png')} style = {{width:20,height:30}}/>,
        tabBarLabel:'Donate Books'
    }},
    BookRequest:{screen:BookRequestScreen,
    navigationOptions:{
        tabBarIcon:<Image source = {require('../assets/icon.png')} style = {{width:20,height:30}}/>,
        tabBarLabel:'Book Request'
    }}
})