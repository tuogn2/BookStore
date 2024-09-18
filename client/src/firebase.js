// src/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsuUCQO7nnLAE-R7XTjnRNQVOay3-USNc",
  authDomain: "bookstore-e0500.firebaseapp.com",
  projectId: "bookstore-e0500",
  storageBucket: "bookstore-e0500.appspot.com",
  messagingSenderId: "262106912170",
  appId: "1:262106912170:web:8cc4eff2c9f50ea1ad87d3",
  measurementId: "G-88PKRPHBJT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);

export { auth, provider, signInWithPopup };
