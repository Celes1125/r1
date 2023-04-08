

import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {

    apiKey: "AIzaSyAf8z9xKC8inPSCKrl7G1OLU8Bn4kGHETc",
  
    authDomain: "react-1-2b40d.firebaseapp.com",
  
    projectId: "react-1-2b40d",
  
    storageBucket: "react-1-2b40d.appspot.com",
  
    messagingSenderId: "171752242530",
  
    appId: "1:171752242530:web:b6e05af4c52c4e9225c03b"
  
  };
  

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


