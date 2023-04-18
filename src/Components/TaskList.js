
import React, {useContext} from "react";
import { Container, Stack, Row, Col, Button } from "react-bootstrap";
import firebaseApp from "../Config/firebase";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import TaskListContext from "../Contexts/TaskListContext";
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


const TaskList = ({tasks, setTasks})=>{

    const context = useContext(TaskListContext);

    async function deleteTask (tIdtoDelete){
        
        //generar el nuevo array, sin el elemento a eliminar
        const newTasks = tasks.filter((t)=> t.itemId !== tIdtoDelete);
        //borrar el archivo del storage
        const taskToDelete = tasks.filter((t)=> t.itemId == tIdtoDelete);
        console.log("taskToDelete: ", taskToDelete);
        const urlToDelete = taskToDelete[0].downloadUrl;        
        console.log("URL: ", urlToDelete);

        const firebaseUrl = "https://firebasestorage";

        if(urlToDelete.includes(firebaseUrl)){
            const fileRef = ref(storage, urlToDelete);
            await deleteObject(fileRef);
        } 
        //actualizar la base de datos
        const docRef = doc(firestore, `usersDocs/${context.globalUser.email}`);
        updateDoc(docRef, {tasks: [...newTasks]});  
        //actualizar el estado correspondiente
        setTasks(newTasks);
        


    }

    console.log("MAIL EN TASKLIST: ", context.globalUser.email);


    return (
        <Container>
            <Stack>
                {tasks.map(
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

    )
}

export default TaskList;