import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import TaskListContext from '../Contexts/TaskListContext'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BsEye } from 'react-icons/bs'
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai'
import firebaseApp from '../Config/firebase'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import { getStorage, ref, deleteObject } from 'firebase/storage'
const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)
const styles = {
  eyes: {
    color: 'green'
  },
  deleteIcon: {
    color: 'red'
  },
  icons_container: {

    border: 'solid red 1px'
  },

  border: {
    borderBottom: 'solid blue 1px'
  }

}

function TaskList () {
  const context = useContext(TaskListContext)

  // delete task function

  const deleteTask = async (tIdtoDelete) => {
    // generating a new task array without the item wich is want to eliminate
    const newTasks = context.tasks.filter((t) => t.itemId !== tIdtoDelete)
    // deleting the file associated with the task to be deleted
    const taskToDelete = context.tasks.filter((t) => t.itemId === tIdtoDelete)
    console.log('taskToDelete: ', taskToDelete)
    const urlToDelete = taskToDelete[0].downloadUrl
    console.log('URL: ', urlToDelete)
    /* it is created a variable to handle the situation with undefined url data,
        what happens with fake url wich doesnt exists in firebase */
    const firebaseUrl = 'https://firebasestorage'
    if (urlToDelete.includes(firebaseUrl)) {
      const fileRef = ref(storage, urlToDelete)
      await deleteObject(fileRef)
      console.log('task without an associated file on Firebase')
    } else {
      console.log('task without an associated file on Firebase')
    }
    // refreshing database
    const docRef = doc(firestore, `usersDocs/${context.globalUser.email}`)
    await updateDoc(docRef, { tasks: newTasks })
    // refreshing tasks state
    await context.setTasks([...newTasks])
  }

  return (

    context.tasks.map(
      (t) => {
        return (

            <Row key={t.id} style={styles.border}>
              <Col key={t.id} xs={2} md={4} lg={9} >{t.description}</Col>
              <Col key={t.id} xs={1} md={1} lg={1}><Link target='_blank' to={t.downloadUrl}><BsEye style={styles.eyes} /></Link> </Col>
              <Col key={t.id} xs={1} md={1} lg={1}><Link to='/edit' ><AiFillEdit /></Link></Col>
              <Col key={t.id} xs={1} md={1} lg={1}><Link onClick={() => deleteTask(t.itemId)}><AiOutlineDelete style={styles.deleteIcon} /></Link></Col>

            </Row>

        )
      }
    )

  )
}

export default TaskList
