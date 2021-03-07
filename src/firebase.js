import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDQS3EFtdxjKghGBTLPjQPOOkZtbEZ7O-w",
  authDomain: "movie-app-17903.firebaseapp.com",
  projectId: "movie-app-17903",
  storageBucket: "movie-app-17903.appspot.com",
  messagingSenderId: "227579368879",
  appId: "1:227579368879:web:ceb0242fd0528604ef4b5a",
  measurementId: "G-677F1HEFHH",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export default firebase;
export { db, auth };
