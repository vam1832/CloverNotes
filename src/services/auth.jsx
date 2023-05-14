import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRctGPtlrF8sjhnyAf5K7U4VElXUSGmfc",
  authDomain: "kani-85722.firebaseapp.com",
  databaseURL: "https://kani-85722-default-rtdb.firebaseio.com",
  projectId: "kani-85722",
  storageBucket: "kani-85722.appspot.com",
  messagingSenderId: "28410413782",
  appId: "1:28410413782:web:4d5943edff691bfd7ebf77",
  measurementId: "G-Q80NZJD278",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { firebase, auth };
