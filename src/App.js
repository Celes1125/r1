import React, {useState} from "react";
import Home from "./Components/Home";
import Login from "./Components/Login";
import firebaseApp from "./Config/firebase";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const auth = getAuth(firebaseApp);

function App() {
  const [globalUser, setGlobalUser] = useState(null);

  onAuthStateChanged(auth, (user)=>{
    if(user){
      setGlobalUser(user)
    }else{
      setGlobalUser(null)
    }

  })

  return (   
    <>{globalUser ? <Home globalUserEmail={globalUser.email} /> : <Login />}</> 
    
  );
}

export default App;
