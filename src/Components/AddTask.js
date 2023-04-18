import React, {useContext, useReducer} from "react";
import {Container, Stack, Form, Button, Row, Col} from 'react-bootstrap';
import firebaseApp from "../Config/firebase";
import { getFirestore, updateDoc, doc} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import TaskListContext from "../Contexts/TaskListContext";
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


const AddTask = ({setTasks, tasks})=>{

    const context = useContext(TaskListContext);

    let downloadUrl;

    async function addingTask (event){
        event.preventDefault();   
        const description = event.target.descriptionForm.value;     
        const newTasks = [
            ...tasks, 
            {
                id: +new Date(),
                itemId: +new Date(),
                description: description,
                downloadUrl,
            },
        ];
        const docRef = doc(firestore, `usersDocs/${context.globalUser.email}`);
        updateDoc(docRef, {tasks: [...newTasks]});  
        //actualizar el estado correspondiente
        setTasks(newTasks);   
        event.target.descriptionForm.value="";  
    }

    async function fileHandler (event){
        //detectar archivo
        const localFile = event.target.files[0];
        //cargarlo a storage
        const fileRef = ref(storage, `tasksFiles/${localFile.name}`);
        await uploadBytes(fileRef, localFile );
        //obtener url de descarga
        downloadUrl = await getDownloadURL(fileRef);
       
    }

    return (        
        
        <Container>
            
                <Form onSubmit={addingTask}>   
                    <Row>
                        <Col>
                        <Form.Control type="text" placeholder="description" id="descriptionForm"/></Col>
                        <Col>
                        <Form.Control type="file" placeholder="insert file" onChange={fileHandler}/></Col>
                        <Col>
                        <Button type="submit" >Add task </Button></Col>
                        
                    </Row>
                </Form>
            
        </Container>    
    )
      
}    

export default AddTask;