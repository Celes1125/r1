import React from 'react'
import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { AiOutlineSearch, AiOutlineLogout } from 'react-icons/ai'
import Container from 'react-bootstrap/Container'
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
  async function handleSignOut () {
    try {
      await signOut(auth)
      console.log('User sign out successfully')
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }

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
            <Link style={styles.icons} to="/add">+</Link>
            <Link style={styles.icons} to="/search"><AiOutlineSearch /></Link>
            <Link onClick={handleSignOut}><AiOutlineLogout /></Link>
            <Link style={styles.icons} to="/profile"><FaUser /></Link>
          </Container>
        </Navbar>
      </Container>
  )
}

export default Menu
