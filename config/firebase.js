// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import { initializeFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkZe2MBpkqzsfKwE_VB8-iDWQdZSoDFUM",
  authDomain: "ssfev2.firebaseapp.com",
  projectId: "ssfev2",
  storageBucket: "ssfev2.appspot.com",
  messagingSenderId: "686269354523",
  appId: "1:686269354523:web:abd2088a643407b41c9ebe"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const firestore = initializeFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});


// export { auth, firestore };
export { auth };