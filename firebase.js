import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import "@firebase/storage";

// Your web app's Firebase configuration, which you copy-pasted from Step 6
const firebaseConfig = {
  apiKey: "AIzaSyBhxpSupl7CJqe0GnNKNeKvHq8F4B2K20Q",
  authDomain: "sandbox-44ab5.firebaseapp.com",
  projectId: "sandbox-44ab5",
  storageBucket: "sandbox-44ab5.appspot.com",
  messagingSenderId: "975009720663",
  appId: "1:975009720663:web:c5750c0b88c2f4f049f612",
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);
let firestore = firebase.firestore();

export default firestore;
