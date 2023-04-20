//IMPORTS
//react
import React, { useContext } from "react"; 
//Context
import TaskListContext  from "./Contexts/TaskListContext"; 
//Locals
import Login from "./Components/Login";
import Home from "./Pages/Home";
//Firebase
import firebaseApp from "./Config/firebase";
import {getAuth, onAuthStateChanged} from "firebase/auth";
const auth = getAuth(firebaseApp);


//MAIN

function App() {    
  const context = useContext(TaskListContext);
  //Monitoring login user state with this firebase method: 
  onAuthStateChanged(auth, (user)=>{    
    if(user){
      {context.setGlobalUser(user)}
    }else{
      {context.setGlobalUser(null)}
    }

  })

  return (
    <TaskListContext.Consumer>
      {context=>
      <div>
      {context.globalUser ? <Home /> : <Login />} 
      </div>
      }
    </TaskListContext.Consumer>  
  );
}
export default App;
