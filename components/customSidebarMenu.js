import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView} from 'react-native';
import firebase from 'firebase';
import { DrawerItems } from 'react-navigation-drawer';

export default class CustomSideBarMenu extends React.Component{
    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.drawerItemsContainer}>
                    <DrawerItems {...this.props}/>
                </View>
                <View style = {styles.logOutContainer}>
                    <TouchableOpacity onPress = {()=>{this.props.navigation.navigate("WelcomeScreen")
                firebase.auth().signOut()}} style = {styles.logOutButton}>
                        <Text style = {styles.logOutText}>
                            Log Out
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    drawerItemsContainer:{
        flex:0.8,
    },
    logOutContainer:{
        flex:0.2,
        justifyContent:'flex-end',
        paddingBottom:50,
    },
    logOutButton:{
        height:30,
        width:'100%',
        justifyContent:'center',
        padding:10,
    },
    logOutText:{
        fontSize:30,
        fontWeight:'bold',
    },
})