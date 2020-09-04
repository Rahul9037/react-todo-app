import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBAc-3NPXe7mW4qTbK0d_xAyEvRxClbsLs",
    authDomain: "react-todo-3bfee.firebaseapp.com",
    databaseURL: "https://react-todo-3bfee.firebaseio.com",
    projectId: "react-todo-3bfee",
    storageBucket: "react-todo-3bfee.appspot.com",
    messagingSenderId: "1083505703479",
    appId: "1:1083505703479:web:f46104fe3557b357639db2",
    measurementId: "G-L2DN7H9X8H"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();

  export default db;