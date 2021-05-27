import firebase from "firebase/app";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyAcPNhLldq6Wo5IYFPY7zbKZZIajTMqLGk",
  authDomain: "reverse-ipa.firebaseapp.com",
  projectId: "reverse-ipa",
  storageBucket: "reverse-ipa.appspot.com",
  messagingSenderId: "986256099270",
  appId: "1:986256099270:web:6764f87d425041041d94c7",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const projectFirestore = firebase.firestore();
