// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAo8iRsJ7ihZRKlj8OiyFzOyLLxOeMahNo",
//   authDomain: "metroshelter-7a7d6.firebaseapp.com",
//   projectId: "metroshelter-7a7d6",
//   storageBucket: "metroshelter-7a7d6.appspot.com",
//   messagingSenderId: "707431960107",
//   appId: "1:707431960107:web:a70e91d0196d889b8fe46e",
// };

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
