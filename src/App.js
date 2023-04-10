import React, {useState, useEffect} from "react";
import Home from "./Components/Home";
import Login from "./Components/Login";

function App() {
  const [globalUser, setGlobalUser] = useState(null);

  return (   
    <>{globalUser ? <Home /> : <Login />}</> 
    
  );
}

export default App;
