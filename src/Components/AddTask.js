import React from "react";
import {Container, Stack, Form, Button, Row, Col} from 'react-bootstrap';
import firebaseApp from "../Config/firebase";
import { getFirestore, updateDoc, doc} from "firebase/firestore";
const firestore = getFirestore(firebaseApp);


const AddTask = ({globalUserEmail, setTasks, tasks})=>{

    async function addingTask (event){
        event.preventDefault();   
        const description = event.target.descriptionForm.value;     
        const newTasks = [
            ...tasks, 
            {
                id: +new Date(),
                description: description,
                url: "https://picsum.photos/420",
            },
        ]
        const docRef = doc(firestore, `usersDocs/${globalUserEmail}`);
        await updateDoc(docRef, {tasks: [...newTasks]});  
        //actualizar el estado correspondiente
        setTasks(newTasks);
        


    }

    return (
        <Container>
            <Stack>
                <Form onSubmit={addingTask}>
                    <Row>
                        <Col>
                        <Form.Control type="text" placeholder="description" id="descriptionForm"/></Col>
                        <Col>
                        <Form.Control type="file" placeholder="insert file"/></Col>
                        <Col>
                        <Button type="submit" >Add task </Button></Col>
                        
                    </Row>
                </Form>
            </Stack>
        </Container>
       
      


    )
      
}  


    
    
    
    
     

export default AddTask;