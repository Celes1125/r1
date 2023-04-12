
import { Button, Container } from "react-bootstrap";
import firebaseApp from "../Config/firebase";
import { getAuth, signOut } from "firebase/auth";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";
import { useEffect, useState } from "react";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);


function Home (globalUserEmail){

    const [tasks, setTasks] = useState([]);
    
    const fakeData = [
        {id: 1, description: "tarea falsa 1", url: "https://picsum.photos/420"},
        {id: 2, description: "tarea falsa 2", url: "https://picsum.photos/420"},
        {id: 3, description: "tarea falsa 3", url: "https://picsum.photos/420"}
    ]

    async function searchOrCreateDocs (documentId) {
        //crear la referencia al documento
        const docRef = doc(firestore, `usersDocs/${documentId}`);
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
            <h4>Hola, sesión iniciada</h4>
            <Button onClick={()=>{signOut(auth)}}>
                Cerrar sesión
            </Button>
            
            <AddTask />  
            {tasks? 
                <TaskList taskArray={tasks}/> 
                :null
            }
                     
        </Container>   
    )
}
export default Home;