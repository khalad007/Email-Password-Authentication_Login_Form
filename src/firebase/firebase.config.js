// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDV5tXvGVOKvA4uGBjr9GnjERrJyf2ji_A",
  authDomain: "user-email-password-c2fc7.firebaseapp.com",
  projectId: "user-email-password-c2fc7",
  storageBucket: "user-email-password-c2fc7.appspot.com",
  messagingSenderId: "359994964967",
  appId: "1:359994964967:web:6b6bf1228cddd9f2c65b42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;