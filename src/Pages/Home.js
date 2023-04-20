//IMPORTS
//React
import React, { useEffect, useContext } from "react"; 
//Context
import TaskListContext from "../Contexts/TaskListContext";
//Firebase
import firebaseApp from "../Config/firebase";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(firebaseApp);
import {getFirestore, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
const firestore = getFirestore(firebaseApp);
//Bootstrap 
import { Button, Container, Stack } from "react-bootstrap";
//Locals
import AddTask from "../Components/AddTask";
import TaskList from "../Components/TaskList";

//MAIN FUNCTION
const Home = ()=>{ 
    const context = useContext(TaskListContext);
    async function searchOrCreateDocs (idDocumento) {
        //creating the doc reference for firebase consulting
        const docRef = doc(firestore, `usersDocs/${idDocumento}`);
        //searching docs in firebase
        const responseDocRef = await getDoc(docRef);  
        //what it will do if the doc exists
        if(responseDocRef.exists()){
            const dataResponse = responseDocRef.data();
            return dataResponse.tasks;
        //what it will do if the doc does not exists
        }else{
            await setDoc(docRef, {tasks:[...context.fakeData]});
            const responseDocRef = await getDoc(docRef); 
            const dataResponse = responseDocRef.data();
            return dataResponse.tasks;
        }    

    }

    useEffect(
        ()=>{
            async function fetchTasks (){                                                
                const fetchedTasks = await searchOrCreateDocs(context.globalUser.email);
                context.setTasks(fetchedTasks); 
            }
            fetchTasks()
        },
        []
    )

    return (
        <TaskListContext.Consumer>
            {context=>
                <Container>
                <Stack>
                <h4>Hello {context.globalUser.email}</h4>
                <div><Button onClick={()=>{signOut(auth)}}>Salir</Button></div>            
                </Stack>
                <div>
                <AddTask/>             
              {context.tasks ? <TaskList /> :null }
                </div>               
                         
            </Container>   
            }
        </TaskListContext.Consumer>        
    )
}

export default Home;

/* NOTE: if it is detected a new user, it is registered and the home page shows
a list of three fake default tasks. If it is detected an existing user, home page shows the
tasklist resulting of the firebase consulting. The "desk" of the user allows him to add
a new task with an asssociated name and file, and also delete it.*/