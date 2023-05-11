import React, { useState, useEffect } from 'react'
import getUser from '../helpers/getUser'

const initialUser = {
  name: 'Celeste',
  email: 'celeste@gmail.com'
}

const FetchCard = () => {
  const [user, setUser] = useState(initialUser)
  const updateUser = () => {
    getUser()
      .then((newUser) => {
        setUser(newUser)
      })
  }

  useEffect(
    () => {
      updateUser()
    },
    []
  )

  return (
        <div>
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
        </div>
  )
}
export default FetchCard
