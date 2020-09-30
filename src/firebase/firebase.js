import * as firebase from "firebase/app";
import 'firebase/messaging';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';


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
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey("BC6YMF8RHVRiJdalgMvHnSXGcX2RYwp2zVSpVtLGBb75KTQcLnYMSxBWm7l_2hhDfDGHSVO5_IAOyNsgEDM64kY");

export { messaging };
export const auth 			= firebase.auth;
export const db 			 = firebase.database(); 
export const firestore = firebase.firestore();
export const functions = firebase.functions();
