// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// veer's cred
// const firebaseConfig = {
//   apiKey: "AIzaSyD9-u7P_vSSLA9LFNnrlUxHWzN-MtZWFSM",
//   authDomain: "fir-resort-97242.firebaseapp.com",
//   projectId: "fir-resort-97242",
//   storageBucket: "fir-resort-97242.appspot.com",
//   messagingSenderId: "6741064879",
//   appId: "1:6741064879:web:85ce566a8282378beea85a",
//   measurementId: "G-CLHL3MGVXK"
// };
// rks cred
const firebaseConfig = {
  apiKey: "AIzaSyDLb3l0PbrrpdrhgGFgqL30v_xUrhq0DGA",
  authDomain: "the-weekend-door.firebaseapp.com",
  projectId: "the-weekend-door",
  storageBucket: "the-weekend-door.appspot.com",
  messagingSenderId: "1049622754720",
  appId: "1:1049622754720:web:08da9fd414b670f7b060c5",
  measurementId: "G-ZEZDSP5V76"
};


// Initialize Firebase on the client side only
if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
}

export { app, analytics };