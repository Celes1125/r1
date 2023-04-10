import React, {useState, useEffect} from "react";
import Home from "./Components/Home";
import Login from "./Components/Login";
import firebaseApp from "./Config/firebase";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const auth = getAuth(firebaseApp);

function App() {
  const [globalUser, setGlobalUser] = useState(null);

  onAuthStateChanged(auth, (firebaseUser)=>{
    if(firebaseUser){
      setGlobalUser(firebaseUser)
    }else{
      setGlobalUser(null)
    }

  })

  return (   
    <>{globalUser ? <Home /> : <Login />}</> 
    
  );
}

export default App;
