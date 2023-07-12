import React, { useContext } from 'react'
import TaskListContext from './Contexts/TaskListContext'
import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Home from './Pages/Home'
import firebaseApp from './Config/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Menu from './Components/Menu'
import Profile from './Pages/Profile'
import SearchTask from './Pages/SearchTask'
import AddTask from './Components/AddTask'
import EditTask from './Components/EditTask'
import { Container } from 'react-bootstrap'
const auth = getAuth(firebaseApp)

function App() {
  const context = useContext(TaskListContext)


  onAuthStateChanged(auth, function (user) {
    if (user) {
      context.setGlobalUser(user)
    }
  }
  )
  
  return (
    <Container>
      <Menu />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/add' exact element={<AddTask />} />
        <Route path='/search' exact element={<SearchTask />} />
        <Route path='/profile' exact element={<Profile />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/edit' exact element={<EditTask />} />
      </Routes>
    </Container>

  )
}

export default App
