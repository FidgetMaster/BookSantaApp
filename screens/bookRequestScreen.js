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
import MyHeader from '../components/myHeader';
import db from '../config'
import firebase from 'firebase'

    export default class BookRequestScreen extends React.Component{
        constructor(){
            super()
            this.state = {
                bookName:'',
                reasonToRequest:'',
                userID:firebase.auth().currentUser.email
            }
        }
        createUniqueId(){
            return Math.random().toString(36).substring(7)
        }
        addRequest = (bookName,reasonToRequest)=>{
            var userID = this.state.userID
            var randomRequestID = this.createUniqueId()
            db.collection('requested_books').add({
                'user_id':userID,
                'book_name':bookName,
                'reason_to_request':reasonToRequest,
                'request_id':randomRequestID
            })
            this.setState({
                bookName:'',
                reasonToRequest:''
            })
            return Alert.alert('Book Requested Successfully')
        }
        render(){
            return(
                <View style = {{flex:1}}>
                   <MyHeader title = 'Request Book'/>
                   <KeyboardAvoidingView style = {styles.keyBoardStyle}>
                       <TextInput placeholder = {'Enter Book Name'} onChangeText = {(text)=>{this.setState({bookName:text})}} value = {this.state.bookName}
                       style = {styles.formTextInput}/>
                       <TextInput placeholder = {'Why Do You Need The Book'} onChangeText = {(text)=>{this.setState({reasonToRequest:text})}} value = {this.state.reasonToRequest}
                       style = {[styles.formTextInput,{height:300}]}
                       multiline
                       numberOfLines = {8}/>
                       <TouchableOpacity style = {styles.button} onPress = {()=>{this.addRequest(this.state.bookName,this.state.reasonToRequest)}}>
                           <Text>
                               Request
                           </Text>
                       </TouchableOpacity>
                   </KeyboardAvoidingView>
                </View>
            )
        }
    }
    const styles = StyleSheet.create({
        keyBoardStyle:{
            flex:1,
            alignItems:'center',
            justifyContent:'center',
        },
        formTextInput:{
            width:'75%',
            height:35,
            alignSelf:'center',
            borderColor:'#ffab91',
            borderRadius:10,
            borderWidth:1,
            marginTop:20,
            padding:10,
        },
        button:{
            width:'75%',
            height:50,
            justifyContent:'center',
            alignItems:'center',
            borderRadius:10,
            backgroundColor:'#ff5722',
        }
    })