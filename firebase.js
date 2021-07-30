import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import "@firebase/storage";

// Your web app's Firebase configuration, which you copy-pasted from Step 6
const firebaseConfig = {
  // CONFIG INFO GOES HERE
  apiKey: "AIzaSyB7RrROnr1nm_hJCCfwtJKw4RSWkCVjBKY",
  authDomain: "chapsnat-jon.firebaseapp.com",
  projectId: "chapsnat-jon",
  storageBucket: "chapsnat-jon.appspot.com",
  messagingSenderId: "229140744092",
  appId: "1:229140744092:web:7aa2717d3141a800efaa59"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);
let firestore = firebase.firestore();

export default firestore;
