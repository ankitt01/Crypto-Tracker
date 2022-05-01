// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv1Z3N7zLLdJ0-Z8qxMBXkea0adZFDQhA",
  authDomain: "crypto-tracker-9a1d8.firebaseapp.com",
  projectId: "crypto-tracker-9a1d8",
  storageBucket: "crypto-tracker-9a1d8.appspot.com",
  messagingSenderId: "378927996455",
  appId: "1:378927996455:web:5aee7b75038513f906b802"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig;