import React from 'react';
import  {FaUser} from 'react-icons/fa';
import  {AiOutlineSearch, AiOutlineLogout} from 'react-icons/ai';
import {MdAddTask} from 'react-icons/md'
import logo from '../Assets/Img/logo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import TaskListContext from '../Contexts/TaskListContext';
import firebaseApp from "../Config/firebase";
import { getAuth, signOut } from "firebase/auth";
import { NavItem } from 'react-bootstrap';
const auth = getAuth(firebaseApp);
const styles = {
    top_container:{   
      marginTop: "20px",   
      width:"80%",
      
    },
    icons_container: {
      width: "25%",      
      
    },
    icons: {
      padding: "1px",      
      
    },
    navbrand:{
      padding:"1px"
    }

}


function Menu() {
  return (
    <TaskListContext.Consumer>
      {context=>  
      <Container style={styles.top_container}> 
        <Navbar bg="light">
          <Container>
          <Navbar.Brand href="/" style={styles.navbrand}>
                          <img src={logo} width="40" height="40"
                          className="d-inline-block align-top"
                          alt="task app logo"
                          />
            </Navbar.Brand>
          </Container>
          {context.globalUser?
          <Container style={styles.icons_container}>
          <Nav.Link style={styles.icons}  href="/add"><MdAddTask /></Nav.Link>  
              <Nav.Link style={styles.icons}  href="/search"><AiOutlineSearch /></Nav.Link>  
              <Nav.Link style={styles.icons} ><AiOutlineLogout onClick={()=>{signOut(auth)}}/></Nav.Link>             
              <Nav.Link style={styles.icons}  href="/profile"><FaUser /></Nav.Link> 
          </Container> : null
          }
          
        </Navbar>  
      </Container>      
                        }
    </TaskListContext.Consumer>
    
  );
}

export default Menu;