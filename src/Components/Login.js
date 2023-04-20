//IMPORTS
//react
import React, {useContext} from 'react'; 
//context
import TaskListContext from '../Contexts/TaskListContext';

//Firebase
import firebaseApp from '../Config/firebase';
import {getAuth,createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, signInWithRedirect, 
        GoogleAuthProvider} from "firebase/auth";
const auth = getAuth(firebaseApp);
const googleProvider= new GoogleAuthProvider();
//Bootstrap
import {Container, Stack, Form, Button} from 'react-bootstrap';

//MAIN FUNCTION
const Login = ()=>{

    const context = useContext(TaskListContext);
    
    async function submitHandler (event){
      event.preventDefault();
      const userEmail = event.target.formBasicEmail.value;
      const userPassword = event.target.formBasicPassword.value;
      if(context.isRegistered) {
        await signInWithEmailAndPassword(auth, userEmail, userPassword);   
      }else{
        const user = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
        console.log ("USER: ", user);
        
      }}

    return (          
    <Container>
        <Stack gap={3}>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />              
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
      
            <Button variant="dark" type="submit">
              {context.isRegistered? "Iniciar sesión" : "Registrarme"}
            </Button>
          </Form>

          <Button variant="primary" type="submit" onClick={()=>signInWithRedirect(auth, googleProvider)}>
          Iniciar sesión con Google
          </Button>
          <Button variant="secondary" type="submit" onClick={()=>context.setIsRegistered(!context.isRegistered)}>
          {context.isRegistered? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
          </Button>
        </Stack> 
    </Container>  
)
}
export default Login;

/*NOTE: The last button allows to switch wether the user is registered or not, 
being the options: 1. signup, signin with email and password, and signin with Gmail.*/