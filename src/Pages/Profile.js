import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import firebaseApp from '../Config/firebase'
import { collection, getDocs, deleteDoc } from 'firebase/firestore'
import { getAuth, deleteUser } from 'firebase/auth'
import TaskListContext from '../Contexts/TaskListContext'
const auth = getAuth(firebaseApp)

const Profile = () => {
  const context = useContext(TaskListContext)
  const deleteUserCollection = async () => {
    try {
      const querySnapshot = await getDocs(collection(auth, 'users'))
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          deleteDoc(doc.ref)
        })
        alert('todos los usuarios han sido eliminados')
        console.log('ok')
      } else {
        alert('no hay usuarios para eliminar')
      }
    } catch (error) {
      alert('ERROR: ', error)
    }
  }

  async function deleteCurrentUser () {
    try {
      const user = auth.currentUser

      await deleteUser(user)
      alert('Su cuenta ha sido eliminada correctamente')
    } catch (error) {
      alert('ERROR: ', error)
    }
  }

  console.log('USUARIOGLOBAL: ', context.globalUser.email)

  return (
        <div>
        Profile
        <Button variant='danger' onClick={() => deleteUserCollection()}>
        Borrar todos los usuarios

        </Button>

        <Button variant='warning' onClick={() => deleteCurrentUser()}>
            Borrar usuario actual
        </Button>
        </div>
  )
}
export default Profile
