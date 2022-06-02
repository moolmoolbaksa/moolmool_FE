// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTkDKz_CUTgG561s0WyZ0Q5KSyAra82TI",
  authDomain: "moolmooldoctor.firebaseapp.com",
  projectId: "moolmooldoctor",
  storageBucket: "moolmooldoctor.appspot.com",
  messagingSenderId: "623383258592",
  appId: "1:623383258592:web:4db4524b93dc1f595cf785",
  measurementId: "G-3Q0DQ4RZXM"
};

// Initialize Firyebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// export {auth, apiKey, firestore, storage, realtime, analytics};