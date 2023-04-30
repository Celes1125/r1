import React from 'react'
import { FaUser } from 'react-icons/fa'
import { AiOutlineSearch, AiOutlineLogout } from 'react-icons/ai'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import firebaseApp from '../Config/firebase'
import { getAuth, signOut } from 'firebase/auth'
const auth = getAuth(firebaseApp)
const styles = {
  top_container: {
    marginTop: '20px',
    width: '80%'

  },
  icons_container: {
    width: '25%'

  },
  icons: {
    padding: '1px'

  },
  navbrand: {
    padding: '1px'
  }

}

const Menu = () => {
  return (

    <Container style={styles.top_container}>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="/" style={styles.navbrand}>
            <img src="http://localhost:3000/logo.png" width="40" height="40"
              className="d-inline-block align-top"
              alt="task app logo"
            />
          </Navbar.Brand>
        </Container>

        <Container style={styles.icons_container}>
          <Nav.Link style={styles.icons} href="/add">+</Nav.Link>
          <Nav.Link style={styles.icons} href="/search"><AiOutlineSearch /></Nav.Link>
          <Nav.Link onClick={() => signOut(auth)} style={styles.icons}><AiOutlineLogout /></Nav.Link>
          <Nav.Link style={styles.icons} href="/profile"><FaUser /></Nav.Link>
        </Container>
      </Navbar>
    </Container>
  )
}
export default Menu
