// Import the functions you need from the SDKs you need
import "firebase/compat/auth";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCt3nP7r11e_5ScBrsjEF-sI15luZuTIcE",
  authDomain: "loltracker-63447.firebaseapp.com",
  projectId: "loltracker-63447",
  storageBucket: "loltracker-63447.appspot.com",
  messagingSenderId: "710800705631",
  appId: "1:710800705631:web:5927c323f1828b8ce033ea",
};

// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = getFirestore(); // initialize Firestore
const auth = firebase.auth();

export { firebase, auth, db };
