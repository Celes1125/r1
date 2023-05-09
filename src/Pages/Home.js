import React, { useContext } from 'react'
import TaskListContext from '../Contexts/TaskListContext'
import Board from './Board'
import Login from '../Components/Login'

const Home = () => {
  const context = useContext(TaskListContext)

  return (
    context.globalUser ? <Board /> : <Login />
  )
}
export default Home
