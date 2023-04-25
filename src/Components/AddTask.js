import React, {useContext} from "react";
import TaskListContext from "../Contexts/TaskListContext";
import  Form from "react-bootstrap/Form";
import  Container from "react-bootstrap/Container";
import  Row from "react-bootstrap/Row";
import  Col from "react-bootstrap/Col";
import  Button from "react-bootstrap/Button";
import firebaseApp from "../Config/firebase";
import { getFirestore, updateDoc, doc} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

//adding tasks function
const AddTask = ()=>{
    const context = useContext(TaskListContext);
    let downloadUrl;

    async function addingTask (event){
        event.preventDefault();   
        const description = event.target.descriptionForm.value;     
        const newTasks = [
            ...context.tasks, 
            {
                id: +new Date(),
                itemId: +new Date(),
                description: description,
                downloadUrl,
            },
        ];
        const docRef = doc(firestore, `usersDocs/${context.globalUser.email}`);
        await updateDoc(docRef, {tasks: [...newTasks]});  
        //actualizar el estado correspondiente
        context.setTasks(newTasks);   
          
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
                        <Form.Control type="text" placeholder="insert description" id="descriptionForm"/></Col>
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