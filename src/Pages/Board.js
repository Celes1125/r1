import React, { useEffect, useContext } from 'react'
import TaskListContext from '../Contexts/TaskListContext'
import firebaseApp from '../Config/firebase'
import { getFirestore, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore'
import { BsEye } from 'react-icons/bs'
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai'
import { getStorage, ref, deleteObject } from 'firebase/storage'
import { Row, Col, Container, NavLink } from 'react-bootstrap'

const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

const Board = () => {
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
    },
    top_container: {
      marginTop: '50px',
      width: '80%'
    }
  }
  const context = useContext(TaskListContext)

  const searchOrCreateDocs = async (idDocumento) => {
    // creating the doc reference for firebase consulting
    const docRef = doc(firestore, `usersDocs/${idDocumento}`)
    // searching docs in firebase
    const responseDocRef = await getDoc(docRef)
    // what it will do if the doc exists
    if (responseDocRef.exists()) {
      const dataResponse = responseDocRef.data()
      return dataResponse.tasks
      // what it will do if the doc does not exists
    } else {
      await setDoc(docRef, { tasks: context.fakeData })
      const responseDocRef = await getDoc(docRef)
      const dataResponse = responseDocRef.data()
      return dataResponse.tasks
    }
  }

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
    if (!urlToDelete.includes(firebaseUrl)) {
      console.log('task without an associated file on Firebase successfully deleted')
    } else {
      const fileRef = ref(storage, urlToDelete)
      await deleteObject(fileRef)
      console.log('task with an associated file on Firebase successfully deleted')
    }
    // refreshing database
    const docRef = doc(firestore, `usersDocs/${context.globalUser.email}`)
    await updateDoc(docRef, { tasks: newTasks })
    // refreshing tasks state
    await context.setTasks([...newTasks])
  }

  useEffect(
    () => {
      async function fetchTasks () {
        const fetchedTasks = await searchOrCreateDocs(context.globalUser.email)
        context.setTasks(fetchedTasks)
      }
      fetchTasks()
    },
    [context.setTasks]
  )

  return (

    context.tasks.map(
      (t) => {
        return (
          <Container key={t.id}>
            <Row style={styles.border}>
            <Col xs={2} md={4} lg={9} >{t.description}</Col>
            <Col xs={1} md={1} lg={1}><NavLink href={t.downloadUrl}><BsEye style={styles.eyes} /> </NavLink></Col>
            <Col xs={1} md={1} lg={1}><NavLink href='/edit' ><AiFillEdit /></NavLink></Col>
            <Col xs={1} md={1} lg={1}><NavLink onClick={() => deleteTask(t.itemId)}><AiOutlineDelete style={styles.deleteIcon} /></NavLink></Col>

          </Row>

          </Container>

        )
      }
    )

  )
}

export default Board
