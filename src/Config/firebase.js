
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getStorage, RecaptchaVerifier, uploadBytes, getDownloadURL, getBytes} from 'firebase/storage';
import {getFirestore, collection,addDoc, getDocs,doc,getDoc, query, where, setDoc, deleteDoc} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAHx5iA17JKk-NOiIhNsD5gEEO3HwJTFIg",

    authDomain: "react1-25798.firebaseapp.com",
  
    projectId: "react1-25798",
  
    storageBucket: "react1-25798.appspot.com",
  
    messagingSenderId: "241811048948",
  
    appId: "1:241811048948:web:b63b9b7668632dafbbd1a1" 

};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const collectionUsers = collection(db, "users");

