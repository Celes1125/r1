
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

function firebase () {
  const firebaseConfig = {

    apiKey: "AIzaSyAUWW_OvQrHfoAdTpFC7WWTjFY5LF3pyjU",
  
    authDomain: "reactprojects-r1.firebaseapp.com",
  
    projectId: "reactprojects-r1",
  
    storageBucket: "reactprojects-r1.appspot.com",
  
    messagingSenderId: "89006717103",
  
    appId: "1:89006717103:web:d97fc0373b3e8f5dc6fc5a"
  
  }     

  
  const app = initializeApp(firebaseConfig);
  const db = firebase.getFirestore(app)

}


    

export default firebase;