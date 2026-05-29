// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbL97xQD75KdUH2fzDT3TRoiUgCdL3hIE",
  authDomain: "stream-clone-78ab8.firebaseapp.com",
  projectId: "stream-clone-78ab8",
  storageBucket: "stream-clone-78ab8.firebasestorage.app",
  messagingSenderId: "802535683889",
  appId: "1:802535683889:web:5cc9da7da147796151a210",
  measurementId: "G-GXWJWG7GDC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app); 
