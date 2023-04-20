//IMPORTS
//react
import React, {useState} from "react";
//context
import TaskListContext from "./TaskListContext";
//firebase
import firebaseApp from "../Config/firebase";
import {getAuth} from "firebase/auth";
const auth = getAuth(firebaseApp);

//MAIN
//creating the provider for TaskListContext context
function GlobalState ({children}){
    //hooks 
    const [globalUser, setGlobalUser] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [tasks, setTasks] = useState(null);
    const fakeData = [
      {id: 1, itemId: 1, description: "tarea falsa 1", downloadUrl: "https://picsum.photos/420"},
      {id: 2, itemId: 2, description: "tarea falsa 2", downloadUrl: "https://picsum.photos/420"}, 
      {id: 3, itemId: 3, description: "tarea falsa 3", downloadUrl: "https://picsum.photos/420"}
    ]    
    
    return (
        <TaskListContext.Provider
            value = {{
                      globalUser, setGlobalUser,
                      isRegistered, setIsRegistered,
                      tasks, setTasks,
                      fakeData}}>
        {children}
        </TaskListContext.Provider>
    )
};
export default GlobalState;
