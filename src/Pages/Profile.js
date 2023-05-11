import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import firebaseApp from '../Config/firebase'
import { collection, getDocs, deleteDoc } from 'firebase/firestore'
import { getAuth, deleteUser } from 'firebase/auth'
import TaskListContext from '../Contexts/TaskListContext'

const auth = getAuth(firebaseApp)

const Profile = () => {
  const context = useContext(TaskListContext)

  const handleDeleteUserCollection = async () => {
    const confirm = window.confirm('¿Estás seguro que deseas eliminar todos los usuarios?')
    if (confirm) {
      try {
        const querySnapshot = await getDocs(collection(auth, 'users'))
        if (querySnapshot.exists) {
          querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref)
          })
          alert('Todos los usuarios han sido eliminados.')
          console.log('ok')
        } else {
          alert('No hay usuarios para eliminar.')
        }
      } catch (error) {
        alert(`Error: ${error}`)
      }
    }
  }

  async function handleDeleteCurrentUser () {
    const confirm = window.confirm('¿Estás seguro que deseas eliminar tu cuenta?')
    if (confirm) {
      try {
        const user = auth.currentUser
        await deleteUser(user)
        alert('Su cuenta ha sido eliminada correctamente.')
        // Agregar aquí la redirección a la página de inicio de sesión o de inicio
      } catch (error) {
        alert(`Error: ${error}`)
      }
    }
  }

  useEffect(
    () => {
      console.log('USUARIOGLOBAL: ', context.globalUser.email)
    },
    []
  )

  return (
    <div>
      <h1>Profile</h1>
      <Button variant='danger' onClick={() => handleDeleteUserCollection()}>
        Borrar todos los usuarios
      </Button>
      <Button variant='warning' onClick={() => handleDeleteCurrentUser()}>
        Borrar usuario actual
      </Button>
    </div>
  )
}

export default Profile
