import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAWmhphp9gBeUdAqXrKmw8ktU2Px2cTm70",
    authDomain: "letr-c11e5.firebaseapp.com",
    projectId: "letr-c11e5",
    storageBucket: "letr-c11e5.appspot.com",
    messagingSenderId: "551991798037",
    appId: "1:551991798037:web:ed25932c489bdf7329211c",
    measurementId: "G-LE5CDWMJCN"
};

// const analytics = getAnalytics(app);
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()