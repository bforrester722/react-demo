// initializes firebase
import * as firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBjY6onLLdfafUoorom7fTe8DIWjH3a1kc",
  authDomain: "forr-resume.firebaseapp.com",
  databaseURL: "https://forr-resume.firebaseio.com",
  projectId: "forr-resume",
  storageBucket: "forr-resume.appspot.com",
  messagingSenderId: "11796930144",
  appId: "1:11796930144:web:57d589c7f7880fd84d6d05",
  measurementId: "G-SGL0VEC8TL"
};

const initializedFirebaseApp = firebase.initializeApp(firebaseConfig);

export {firebase};

