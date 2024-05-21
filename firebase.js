// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD9-u7P_vSSLA9LFNnrlUxHWzN-MtZWFSM",
//   authDomain: "fir-resort-97242.firebaseapp.com",
//   projectId: "fir-resort-97242",
//   storageBucket: "fir-resort-97242.appspot.com",
//   messagingSenderId: "6741064879",
//   appId: "1:6741064879:web:85ce566a8282378beea85a",
//   measurementId: "G-CLHL3MGVXK"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDLb3l0PbrrpdrhgGFgqL30v_xUrhq0DGA",
  authDomain: "the-weekend-door.firebaseapp.com",
  projectId: "the-weekend-door",
  storageBucket: "the-weekend-door.appspot.com",
  messagingSenderId: "1049622754720",
  appId: "1:1049622754720:web:08da9fd414b670f7b060c5",
  measurementId: "G-ZEZDSP5V76"
};

let app;
let analytics;
let auth;
let firestore; // Create a variable for Firestore
let storage;

if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  auth = getAuth(app); 
  firestore = getFirestore(app); // Initialize Firestore using the app instance
  storage=getStorage(app);
}

export { app, analytics, firestore,storage }; 