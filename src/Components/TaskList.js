        import React, {useContext} from "react";
        import {Link} from 'react-router-dom';
        import TaskListContext from "../Contexts/TaskListContext";
        import  {Container, Row, Col, Button, Stack, Image}  from "react-bootstrap";
        import {BsEye} from 'react-icons/bs';
        import {TiDelete} from 'react-icons/ti';
        import {AiFillEdit} from 'react-icons/ai'
        import firebaseApp from "../Config/firebase";
        import { getFirestore, doc, updateDoc } from "firebase/firestore";
        import { getStorage, ref, deleteObject } from "firebase/storage";
        import { AiOutlineDelete } from "react-icons/ai";
        import {EditTask} from '../Components/EditTask.js';
        const firestore = getFirestore(firebaseApp);
        const storage = getStorage(firebaseApp);
        const styles = {
            eyes: {        
            color:"green",  
            },
            deleteIcon: {        
                color:"red",  
                },          
            icons_container: {
               
                border: "solid red 1px"},
                
            border : {
                borderBottom:"solid blue 1px",
            }          

            
        }


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
                    <Container  fluid="xl">
                        
                        {context.tasks.map(
                            (t)=>{
                                return (
                                    <>                                    
                                    <Stack>
                                    <Row   style={styles.border}  xs={2} md={4} lg={8} key={t.id}>

                                        <Col   xs={2} md={4} lg={9} >{t.description}</Col>

                                        
                                        <Col  xs={1} md={1} lg={1}><Link to={t.downloadUrl}><BsEye style={styles.eyes}/></Link> </Col>
                                        <Col xs={1} md={1} lg={1}><Link to="/edit" ><AiFillEdit /></Link></Col>
                                        <Col  xs={1} md={1} lg={1}><Link onClick={()=>deleteTask(t.itemId)}><AiOutlineDelete style={styles.deleteIcon}/></Link></Col>
                                        
                                        
                                       
                                    </Row>
                                    </Stack>
                                       
                                    
                                    
                                   
                                                             
                                    </>
                                )
                            }
                        )}
                        
                </Container>
                }           
                    
            </TaskListContext.Consumer>       

        )
        }
        export default TaskList;