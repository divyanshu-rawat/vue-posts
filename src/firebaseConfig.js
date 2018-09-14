

import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
  var config =  {
    apiKey: "......",
    authDomain: "hackern-8c8a9.firebaseapp.com",
    databaseURL: "......",
    projectId: "hackern-8c8a9",
    storageBucket: "",
    messagingSenderId: "237804719264"
  };


firebase.initializeApp(config)


// firebase utils
const db          = firebase.firestore();
const auth        = firebase.auth();
const currentUser = auth.currentUser;
const settings = {timestampsInSnapshots: true};
db.settings(settings);

// date issue fix according to firebase
// const settings = {
//     timestampsInSnapshots: true
// }
// db.settings(settings)
// db.enablePersistence();

// firebase collections
const usersCollection    = db.collection('users')
const postsCollection    = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection    = db.collection('likes')

export const fbconfig = {
    db,
    auth,
    currentUser,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}
