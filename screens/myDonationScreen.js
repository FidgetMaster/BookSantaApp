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

export default class MyDonationScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            donorID: firebase.auth().currentUser.email,
            donorName: '',
            allDonations: [],
        }
        this.requestRef = null
    }
    getDonorDetails = ()=>{
        db.collection('users').where('email_id','==',this.state.donorID).get()
        .then((snapshot)=>{snapshot.forEach((doc)=>{this.setState({
           donorName:doc.data().first_name+' '+ doc.data().last_name
        })})})
    }
    getAllDonations = ()=>{
            this.requestRef = db.collection("all_donations")
            .onSnapshot((snapshot)=>{
              var allDonations = snapshot.docs.map((doc) => doc.data())
              this.setState({
                allDonations : allDonations
              });
            })
    }
    sendBook = (bookDetails)=>{
        if(bookDetails.request_status === "Book Sent"){
            var requestStatus = "Donor Interested"
            db.collection('all_donations').doc(bookDetails.doc_id).update({
                request_status: 'Donor Interested'
            })
            this.sendNotification(bookDetails,requestStatus)
        }
        else{
            var requestStatus = "Book Sent"
            db.collection('all_donations').doc(bookDetails.doc_id).update({
                request_status: 'Book Sent'
            })
            this.sendNotification(bookDetails,requestStatus)
        }
    }
    sendNotification = (bookDetails,request_status)=>{
        var requestID = bookDetails.request_id
        var donorID = bookDetails.donor_id
        db.collection('all_notifications').where('request_id', '==', requestID).where('donor_id', '==', donorID).get()
        .then(()=>{
            snapshot.forEach(()=>{
                var message = ''
                if(request_status === 'Book Sent'){
                    message = this.state.donorName + ' sent you book'
                }
                else{
                    message = this.state.donorName + ' has shown interest in donating the book'
                }
                db.collection('all_notifications').doc(doc.id).update({
                    message:message,
                    notification_status: 'Unread',
                    date: firebase.firestore.FieldValue.serverTimestamp()
                })
            })
        })
    }
    componentDidMount(){
        this.getDonorDetails()
        this.getAllDonations()
    }
    keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.book_name}
        subtitle={'Requested By: ' + item.requested_by + '\n Status: ' + item.request_status}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={[styles.button,{backgroundColor:item.request_status === 'Book Sent' ? 'green': '#ff5722'}]}
              onPress ={()=>{
               this.sendBook(item)
              }}
              >
              <Text style={{color:'#ffff'}}>{item.request_status === 'Book Sent' ? 'Book Sent': 'Send Book'}</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }

    render(){
        return(
            <View>
                <MyHeader title = 'My Donations'/>
                <View>
                {
            this.state.allDonations.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Requested Books</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allDonations}
                renderItem={this.renderItem}
              />
            )
          }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
  })