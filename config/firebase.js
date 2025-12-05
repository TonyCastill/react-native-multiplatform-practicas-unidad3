// Firebase configuration and initialization
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
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

// Initialize Firebase (only if not already initialized)
let app;
let database;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

database = getDatabase(app);

export { app, database };
export default database;
