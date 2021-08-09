import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import "@firebase/storage";
import "@firebase/database"
// Your web app's Firebase configuration, which you copy-pasted from Step 6
const firebaseConfig = {
  // CONFIG INFO GOES HERE
  apiKey: "AIzaSyCLakXwY46ZFm_Uh0O4i1Y9nmtfKQZV3I4",
    authDomain: "breaking-4c024.firebaseapp.com",
    projectId: "breaking-4c024",
    storageBucket: "breaking-4c024.appspot.com",
    messagingSenderId: "251064928373",
    appId: "1:251064928373:web:c09c033ef0637a181ed03c"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);
let firestore = firebase.firestore();

export default firestore;
