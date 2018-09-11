

import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
  var config = {
    apiKey: "AIzaSyDkal3d_DGdh-NO3ulwLjR9Pd5cO8QwAtc",
    authDomain: "vue-app-7bd15.firebaseapp.com",
    databaseURL: "https://vue-app-7bd15.firebaseio.com",
    projectId: "vue-app-7bd15",
    storageBucket: "",
    messagingSenderId: "2697753342"
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
