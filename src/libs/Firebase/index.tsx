// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOYxRM8oEyf-t8WP0AmdXIH_CaQF1ybLs",
  authDomain: "house-management-dd6bd.firebaseapp.com",
  projectId: "house-management-dd6bd",
  storageBucket: "house-management-dd6bd.appspot.com",
  messagingSenderId: "819025331902",
  appId: "1:819025331902:web:7adea7cd66d46dc55840ef",
  measurementId: "G-QP98DD4JZ4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// export const db = getFirestore(app);
export const database = getDatabase(app);
export default app;
