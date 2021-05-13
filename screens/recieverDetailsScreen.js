import React, { Component } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SnapshotViewIOSBase} from 'react-native';
import MyHeader from '../components/myHeader'
import db from '../config'
import firebase from 'firebase'
import { Card } from 'react-native-elements';

export default class ReceiverDetailsScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            userID:firebase.auth().currentUser.email,
            userName:'',
            receiverID:this.props.navigation.getParam('details')['user_id'],
            requestID:this.props.navigation.getParam('details')['request_id'],
            bookName:this.props.navigation.getParam('details')['book_name'],
            reason:this.props.navigation.getParam('details')['reason_to_request'],
            receiverName:'',
            receiverContact:'',
            receiverAddress:'',
            receiverRequestDocID:'',
        }
    }
    getReceiverDetails = ()=>{
        db.collection('users').where('email_id','==',this.state.receiverID).get()
        .then((snapshot)=>{snapshot.forEach((doc)=>{this.setState({
            receiverName:doc.data().first_name,
            receiverContact:doc.data().contact,
            receiverAddress:doc.data().address
        })})})
        db.collection('requested_books').where('request_id','==',this.state.requestID).get()
        .then(()=>{snapshot.forEach(()=>{this.setState({
            receiverRequestDocID:doc.id
        })})})
    }
    getUserDetails = ()=>{
        db.collection('users').where('email_id','==',this.state.userID).get()
        .then((snapshot)=>{snapshot.forEach((doc)=>{this.setState({
           userName:doc.data().first_name+' '+ doc.data().last_name
        })})})
    }
    componentDidMount(){
        this.getReceiverDetails()
        this.getUserDetails()
    }
    updateBookStatus = ()=>{
        db.collection('all_donations').add({
            book_name: this.state.bookName,
            request_id: this.state.requestID,
            requested_by: this.state.receiverName,
            donor_id: this.state.userID,
            request_status: 'Donor Interested'
        })
    }
    addNotification = ()=>{
        var message = this.state.userName + ' has shown interest in donating the book'
        db.collection('all_notifications').add({
            'targeted_user_id': this.state.receiverID,
            donor_id: this.state.userID,
            request_id: this.state.requestID,
            book_name: this.state.bookName,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            notification_status: 'Unread',
            message:message
        })
    }
    render(){
        return(
            <View style = {styles.container}>
                <View style = {{flex:0.1}}>
                    <MyHeader title = 'Donate Books'/>
                </View>
                <View style = {{flex:0.3}}>
                    <Card title = {'Book Information'} titleStyle = {{fontSize:20}}>
                        <Card>
                            <Text style = {{fontWeight:'bold'}}>
                                Name: {this.state.bookName}
                            </Text>
                        </Card>
                        <Card>
                            <Text style = {{fontWeight:'bold'}}>
                                Reason: {this.state.reason}
                            </Text>
                        </Card>
                    </Card>
                </View>
                <View style = {{flex:0.3}}>
                    <Card title = {'Receiver Information'} titleStyle = {{fontSize:20}}>
                        <Card>
                            <Text style = {{fontWeight:'bold'}}>
                                Name: {this.state.receiverName}
                            </Text>
                        </Card>
                        <Card>
                            <Text style = {{fontWeight:'bold'}}>
                                Contact: {this.state.receiverContact}
                            </Text>
                        </Card>
                        <Card>
                            <Text style = {{fontWeight:'bold'}}>
                                Address: {this.state.receiverAddress}
                            </Text>
                        </Card>
                    </Card>
                </View>
                <View style = {styles.buttonContainer}>
                    {this.state.receiverID !== this.state.userID} ?
                    (<TouchableOpacity style = {styles.button} onPress = {()=>{
                        this.updateBookStatus()
                        this.addNotification()
                        this.props.navigation.navigate('MyDonations')
                    }}>
                        <Text>
                            I Want To Donate
                        </Text>
                     </TouchableOpacity>):null
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{flex:1},
    buttonContainer:{flex:0.3, justifyContent:'center', alignItems:'center'},
    button:{
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#ff9800",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        padding: 10
      },
})