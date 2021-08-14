import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAP1yQcq7vOXj8C1QN5lEgNzXfQr9nLMW4",
  authDomain: "instareels-77a8a.firebaseapp.com",
  projectId: "instareels-77a8a",
  storageBucket: "instareels-77a8a.appspot.com",
  messagingSenderId: "306138798484",
  appId: "1:306138798484:web:cc286f7e4d9310bc355781"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

let Provider = new firebase.auth.GoogleAuthProvider();
export const loginWithGoogle = () => auth.signInWithPopup(Provider);
export default firebase;