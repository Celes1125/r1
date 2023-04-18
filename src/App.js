import React, { useContext } from "react"; //se agrega el método useContext que nos permite consumir el contexto asociado al provider
import Home from "./Components/Home";
import Login from "./Components/Login";
import TaskListContext  from "./Contexts/TaskListContext"; // importo el contexto porque App quiere ser consumidor de ese contexto asociado al proveedor GlobalState
import firebaseApp from "./Config/firebase";
import {getAuth, onAuthStateChanged} from "firebase/auth";
const auth = getAuth(firebaseApp);

function App() {    
  const context = useContext(TaskListContext);
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
