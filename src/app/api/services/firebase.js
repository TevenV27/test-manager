import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB4_0LBd8MvhXMx-LmsT5ySCc1vHqE2Ws",
  authDomain: "test-manager-9e04c.firebaseapp.com",
  projectId: "test-manager-9e04c",
  storageBucket: "test-manager-9e04c.appspot.com",
  messagingSenderId: "1094594355463",
  appId: "1:1094594355463:web:bb7dbd0d0ec0e86c7525a2",
  measurementId: "G-7R9ETZ15XY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);