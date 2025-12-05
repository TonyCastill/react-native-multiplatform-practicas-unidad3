// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMhLMI4gMhWejW5sEjIjwRnnfI48_TknE",
  authDomain: "apps-multiplataforma.firebaseapp.com",
  databaseURL: "https://apps-multiplataforma-default-rtdb.firebaseio.com",
  projectId: "apps-multiplataforma",
  storageBucket: "apps-multiplataforma.firebasestorage.app",
  messagingSenderId: "1018071363964",
  appId: "1:1018071363964:web:32cb1e8d84e1b58d1874f9",
  measurementId: "G-Y49EF4CR4X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
