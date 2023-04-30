import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TaskListContext from './TaskListContext'

const GlobalState = props => {
  const [globalUser, setGlobalUser] = useState({ user: { email: 'defaultUser@gmail.com' } })
  const [isRegistered] = useState(false)
  const [tasks, setTasks] = useState(null)
  const fakeData = [
    { id: 1, itemId: 1, description: 'tarea falsa 1', downloadUrl: 'https://picsum.photos/420' },
    { id: 2, itemId: 2, description: 'tarea falsa 2', downloadUrl: 'https://picsum.photos/420' },
    { id: 3, itemId: 3, description: 'tarea falsa 3', downloadUrl: 'https://picsum.photos/420' }
  ]

  return (
    <div>
      <TaskListContext.Provider
        value={{
          globalUser,
          setGlobalUser,
          isRegistered,
          tasks,
          setTasks,
          fakeData
        }}>{props.children}
      </TaskListContext.Provider>
    </div>
  )
}

GlobalState.propTypes = {
  children: PropTypes.node.isRequired
}

export default GlobalState
