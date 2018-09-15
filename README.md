
## HackerNewsClone-Vue (WIP!!)
An application that works similar to that of HackerNews ;) built on top of vue.js and realtime-firebase-database!

Access Live Application - https://hackernews-4eb03.firebaseapp.com/

## Instructions To Run:

``` npm install ```

``` cd src ```

``` vue serve ```

## App Featues

* Handle and manage state for your app using Vuex. You'll also understand why a central store is important for building large-   scale apps.
* Maintain reactivity within your app by utilizing built-in Vuex features.
* Authenticate routes with vue-router.
* Read/write to a database using Firebase's Cloud Firestore.
* Set up authentication using Firebase.
* Leverage components, one of the more powerful features of Vue.js.
* Familiarize yourself with core Vue.js concepts.


## Setting Up a Database With Firebase Cloud Firestore

I have made use of Cloud Firestore.
Please follow the below-mentioned instructions to configure it.

* To create a Firebase project, go to the Firebase Console and click “add project.” Give it a name, then click “create 
  project.” Click “Add Firebase to your web app.” Be sure to copy this code. You will need it later when you set up the 
  firebaseConfig.js file.
  
* Click “Authentication” in the left-hand navigation, then “Set sign-up method,” then “email/password.” Enable and save.

* Select “Database.” Click “Get started” for Cloud Firestore (currently in beta).
  Start in test mode and enable so anyone can read/write to the database. You will add basic security rules later.
  
* Implement security : Go to your project's Firebase console and click on “Database” then select the “Rules” tab at the top next to “Data.” Then update your security rules and click “Publish.

```

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read;
      allow write: if request.auth.uid != null
    }
  }
}

```


![Alt Text](https://github.com/divyanshu-rawat/HackerNewsClone-Vue/blob/master/Assets/HN.gif)
