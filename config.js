    import firebase from 'firebase'
    require('@firebase/firestore')
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDbYEW1AbxpP-dMkdnbO5HeqZv3A2hXaUw",
    authDomain: "book-santa-20441.firebaseapp.com",
    projectId: "book-santa-20441",
    storageBucket: "book-santa-20441.appspot.com",
    messagingSenderId: "585099818229",
    appId: "1:585099818229:web:3449efb21329fc993c41bc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();