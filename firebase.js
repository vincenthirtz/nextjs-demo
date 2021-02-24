
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_EXAMPLE_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_EXAMPLE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_EXAMPLE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_EXAMPLE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_EXAMPLE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_EXAMPLE_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_EXAMPLE_FIREBASE_MEASUREMENT_ID
};


export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig).firestore() : firebase.app().firestore() ;
