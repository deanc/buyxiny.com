// TODO: find out why this doesnt work when using gatsby-plugin-layout
// import * as firebase from "firebase/app"

// find out why *THIS* does work:
import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

import firebaseConfig from "../config/firebase.env"

// Add your Firebase credentials
firebase.initializeApp(firebaseConfig)

export default firebase
