
import React from "react";
import { Container, Stack, Row, Col, Button } from "react-bootstrap";
import firebaseApp from "../Config/firebase";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
const firestore = getFirestore(firebaseApp);
const TaskList = ({tasks, setTasks, globalUserEmail})=>{

    async function deleteTask (tIdtoDelete){
        //generar el nuevo array, sin el elemento a eliminar
        const newTasks = tasks.filter((t)=> t.itemId !== tIdtoDelete);
        //actualizar la base de datos
        const docRef = doc(firestore, `usersDocs/${globalUserEmail}`);
        updateDoc(docRef, {tasks: [...newTasks]});  
        //actualizar el estado correspondiente
        setTasks(newTasks);


    }

    console.log("MAIL EN TASKLIST: ", globalUserEmail);
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
                                <a href={t.url.downloadUrl}><Button>Ver</Button></a></Col>
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