
import { Button, Container, Stack } from "react-bootstrap";
import firebaseApp from "../Config/firebase";
import { getAuth, signOut } from "firebase/auth";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import {getFirestore, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import React, { useEffect, useState } from "react"; 
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);


const Home = ({globalUserEmail})=>{

    console.log("MAIL EN HOME: ", globalUserEmail);

    const [tasks, setTasks] = useState(null);
    
    const fakeData = [
        {id: 1, itemId: 1, description: "tarea falsa 1", url: "https://picsum.photos/420"},
        {id: 2, itemId: 2, description: "tarea falsa 2", url: "https://picsum.photos/420"},
        {id: 3, itemId: 3, description: "tarea falsa 3", url: "https://picsum.photos/420"}
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
                const fetchedTasks = await searchOrCreateDocs(globalUserEmail);
                setTasks(fetchedTasks);
            }
            fetchTasks()
        },
        []
    )
    return (
        <Container>
            <Stack>
            <h4>Hello {globalUserEmail}</h4>
            <div><Button onClick={()=>{signOut(auth)}}>Salir</Button></div>            
            </Stack>
            <div>
            <AddTask globalUserEmail={globalUserEmail} setTasks={setTasks} tasks={tasks} /> 
          
          {tasks ? <TaskList globalUserEmail={globalUserEmail} setTasks={setTasks} tasks={tasks} /> :null
             }
            </div>
            
                     
        </Container>   
    )
}
export default Home;