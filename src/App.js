import React, { useContext, useEffect } from 'react'
import TaskListContext from './Contexts/TaskListContext'
import Login from './Components/Login'
import Home from './Pages/Home'
import firebaseApp from './Config/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth(firebaseApp)

function App () {
  const context = useContext(TaskListContext)

  useEffect(() => {
    onAuthStateChanged(auth, function (user) {
      if (user) {
        context.setGlobalUser({ ...user })
      } else {
        context.setGlobalUser({})
      }
    })
  }, [context.setGlobalUser])

  return context.globalUser ? <Home /> : <Login />
}

export default App
