import * as firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "../config/firebase";

// Add your Firebase credentials
firebase.initializeApp(firebaseConfig);

export default firebase;
