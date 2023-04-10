import { Button, Container } from "react-bootstrap";
import firebaseApp from "../Config/firebase";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(firebaseApp);

function Home (){
    return (
        <Container>
            <h4>Hola, sesión iniciada</h4>
            <Button onClick={()=>{signOut(auth)}}>
                Cerrar sesión
            </Button>
        </Container>
        
        
        
    )

}

export default Home;