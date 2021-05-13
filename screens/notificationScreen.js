import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/myHeader';

export default class NotificationScreen extends React.Component{
    render(){
        return(
            <View>
                <Text>
                    Notification Screen
                </Text>
            </View>
        )
    }
}