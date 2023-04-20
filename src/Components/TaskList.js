//IMPORTS
//react
import React, {useContext} from "react";
//context
import TaskListContext from "../Contexts/TaskListContext";
//firebase
import firebaseApp from "../Config/firebase";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";i
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
//bootstrap
import { Container, Stack, Row, Col, Button } from "react-bootstrap";

//MAIN
const TaskList = ()=>{

    const context = useContext(TaskListContext);

    //delete task function

    async function deleteTask (tIdtoDelete){
        
        //generating a new task array without the item wich is want to eliminate
        const newTasks = context.tasks.filter((t)=> t.itemId !== tIdtoDelete);
        //deleting the file associated with the task to be deleted
        const taskToDelete = context.tasks.filter((t)=> t.itemId == tIdtoDelete);
        console.log("taskToDelete: ", taskToDelete);
        const urlToDelete = taskToDelete[0].downloadUrl;        
        console.log("URL: ", urlToDelete);
        /*it is created a variable to handle the situation with undefined url data, 
        what happens with fake url wich doesnt exists in firebase*/

        const firebaseUrl = "https://firebasestorage";

        if(urlToDelete.includes(firebaseUrl)){
            const fileRef = ref(storage, urlToDelete);
            await deleteObject(fileRef);
        } 
        //refreshing database
        const docRef = doc(firestore, `usersDocs/${context.globalUser.email}`);
        updateDoc(docRef, {tasks: [...newTasks]});  
        //refreshing tasks state
        context.setTasks(newTasks);       
    }   

    return (
        <TaskListContext.Consumer>{
            context =>
                <Container>
                <Stack>
                    {context.tasks.map(
                        (t)=>{
                            return (
                                <>
                                <hr/>
                                <Row key={t.id}>
                                    <Col  >{t.description}</Col>
                                    <Col>
                                    <a href={t.downloadUrl}><Button>Ver</Button></a></Col>
                                    <Col><Button variant="danger" onClick={()=>deleteTask(t.itemId)}>Eliminar</Button></Col>
                                </Row>
                                <hr/>                            
                                </>
                            )
                        }
                    )}
                </Stack>
            </Container>
            }           
            
        </TaskListContext.Consumer>       

    )
}
export default TaskList;