import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import  { getAuth } from 'firebase/auth';
// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBB4_0LBd8MvhXMx-LmsT5ySCc1vHqE2Ws",
  authDomain: "test-manager-9e04c.firebaseapp.com",
  projectId: "test-manager-9e04c",
  storageBucket: "test-manager-9e04c.appspot.com",
  messagingSenderId: "1094594355463",
  appId: "1:1094594355463:web:bb7dbd0d0ec0e86c7525a2",
  measurementId: "G-7R9ETZ15XY"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const auth = getAuth(app);
export { storage, auth };

// // // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const storage = getStorage(app);


