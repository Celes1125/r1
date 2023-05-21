import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import TaskListContext from '../Contexts/TaskListContext'

const Profile = () => {
  const context = useContext(TaskListContext)

  async function handleDeleteCurrentUser () {
    alert('user deleted')
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

      <Button variant='warning' onClick={ () => handleDeleteCurrentUser() }>
        Eliminar mi cuenta
      </Button>
    </div>
  )
}

export default Profile
