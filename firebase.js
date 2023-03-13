import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBHfakS3C3P2HsU7YZ4UK_wuAg-mmGQ1xc",
    authDomain: "chatapp-rnative.firebaseapp.com",
    projectId: "chatapp-rnative",
    storageBucket: "chatapp-rnative.appspot.com",
    messagingSenderId: "455539081164",
    appId: "1:455539081164:web:53ea2d78c62d1ff6afa769"
}

// const firebaseConfig = {
//     apiKey: "AIzaSyDmjWOT88Eso0C1o75zAmNKIe7u9bBRBKY",
//     authDomain: "dummy-ab459.firebaseapp.com",
//     projectId: "dummy-ab459",
//     storageBucket: "dummy-ab459.appspot.com",
//     messagingSenderId: "592474783500",
//     appId: "1:592474783500:web:634f14a96ab78b624d5329",
//     measurementId: "G-XYZWWV3SDJ"
//   };

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = firebase.auth();

export { db, auth }