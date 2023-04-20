import React, {useEffect, useState} from "react";
import TaskListContext from "./TaskListContext";
import firebaseApp from "../Config/firebase";
import {getAuth, onAuthStateChanged} from "firebase/auth";
const auth = getAuth(firebaseApp);

function GlobalState ({children}){
    //meto los hooks
    const [globalUser, setGlobalUser] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [tasks, setTasks] = useState(null);
    const fakeData = [
      {id: 1, itemId: 1, description: "tarea falsa 1", downloadUrl: "https://picsum.photos/420"},
      {id: 2, itemId: 2, description: "tarea falsa 2", downloadUrl: "https://picsum.photos/420"}, 
      {id: 3, itemId: 3, description: "tarea falsa 3", downloadUrl: "https://picsum.photos/420"}
  ]

    //meto los métodos de acceso, pueden quedar internos tb...

    
    return (
        <TaskListContext.Provider
            value = {{//acá metemos todos los estados y métodos a los que queremos que se tenga acceso a nivel del componente
            globalUser, setGlobalUser,
            isRegistered, setIsRegistered,
            tasks, setTasks,
            fakeData}}>
              {children}
            </TaskListContext.Provider>
    )

};

export default GlobalState;

//Primero se crea el contexto (TaskListContext.js) y luego el provider, que es
// el que tendrá los estados. Por eso aquí importamos useState. También se
// importa el contexto, pues el provider funciona asociado a un contexto.
//Luego importamos el proveedor en los componentes que querramos.
//Si queremos que funcione en toda la aplicación, lo metemos en App. 
//OJO! acordarse de que se reciba y se muestre children!!!

