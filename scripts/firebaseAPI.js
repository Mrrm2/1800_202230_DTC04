//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyBIGzJgy-En9ZH6l-tKja3tjRgtNeUpg0I",
  authDomain: "team04-1f178.firebaseapp.com",
  projectId: "team04-1f178",
  storageBucket: "team04-1f178.appspot.com",
  messagingSenderId: "197628376904",
  appId: "1:197628376904:web:2df411e68c2b88c4f1a57d",
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
