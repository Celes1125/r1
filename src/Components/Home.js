
import { Button, Container, Stack } from "react-bootstrap";
import firebaseApp from "../Config/firebase";
import { getAuth, signOut } from "firebase/auth";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import {getFirestore, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import React, { useEffect, useState, useContext } from "react"; 
import TaskListContext from "../Contexts/TaskListContext";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);


const Home = ()=>{

    //Para consumir del context desde la función antes del return, en la parte lógica de la función, debemos crear una variable
  //que en este caso llamaremos context, usando el useContext que importamos y el contexto que creamos (TaskListContext) como parámetro.
  //Esto sería como decir, "voy a usar este context". Como éste tiene asociado el provider con todas las props y estados allí señalados,
  //esta constante entonces puede acceder a todos ellos.
    
    const context = useContext(TaskListContext);

    console.log("MAIL EN HOME: ", context.globalUser.email);

    const [tasks, setTasks] = useState(null);
    
    const fakeData = [
        {id: 1, itemId: 1, description: "tarea falsa 1", downloadUrl: "https://picsum.photos/420"},
        {id: 2, itemId: 2, description: "tarea falsa 2", downloadUrl: "https://picsum.photos/420"}, 
        {id: 3, itemId: 3, description: "tarea falsa 3", downloadUrl: "https://picsum.photos/420"}
    ]

    async function searchOrCreateDocs (idDocumento) {
        //crear la referencia al documento
        const docRef = doc(firestore, `usersDocs/${idDocumento}`);
        //buscar el documento
        const responseDocRef = await getDoc(docRef);  
        //lo que hará si el doc existe
        if(responseDocRef.exists()){
            const dataResponse = responseDocRef.data();
            return dataResponse.tasks;
        }else{//lo que hará si el doc no existe
            await setDoc(docRef, {tasks:[...fakeData]});
            const responseDocRef = await getDoc(docRef); 
            const dataResponse = responseDocRef.data();
            return dataResponse.tasks;
        }    

    }

    useEffect(
        ()=>{
            async function fetchTasks (){                                                
                const fetchedTasks = await searchOrCreateDocs(context.globalUser.email);
                setTasks(fetchedTasks);                
                
            }
            fetchTasks()
        },
        []
    )

     //Si queremos, como en este caso, acceder a un estado del context pero desde el return, 
  //debemos inyectar el componente del contexto pero como consumidor, y éste recibirá una función arrow.
  //En este caso sería TaskListContext.Consumer
    return (
        <TaskListContext.Consumer>
            {context=>
                <Container>
                <Stack>
                <h4>Hello {context.globalUser.email}</h4>
                <div><Button onClick={()=>{signOut(auth)}}>Salir</Button></div>            
                </Stack>
                <div>
                <AddTask setTasks={setTasks} tasks={tasks} /> 
              
              {tasks ? <TaskList setTasks={setTasks} tasks={tasks} /> :null
                 }
                </div>
                
                         
            </Container>   
                
            }
        </TaskListContext.Consumer>
        
    )
}
export default Home;