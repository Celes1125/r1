import React, { useContext, useState } from 'react'
import TaskListContext from '../Contexts/TaskListContext'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import firebaseApp from '../Config/firebase'
import Board from '../Pages/Board'
import { getFirestore, updateDoc, doc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

const AddTask = () => {
  const context = useContext(TaskListContext)
  const [downloadUrl, setDownloadUrl] = useState('')

  const fileHandler = async (event) => {
    try {
      const localFile = event.target.files[0]
      const fileRef = ref(storage, `tasksFiles/${localFile.name}`)
      await uploadBytes(fileRef, localFile)
      const url = await getDownloadURL(fileRef)
      setDownloadUrl(url)
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  const addingTask = async (event) => {
    try {
      event.preventDefault()
      const description = event.target.description_form.value
      const newTask = {
        id: new Date().getTime(),
        itemId: new Date().getTime(),
        description,
        downloadUrl
      }
      const newTasks = [...context.tasks, newTask]
      const docRef = doc(firestore, `usersDocs/${context.globalUser.email}`)
      await updateDoc(docRef, { tasks: newTasks })
      await context.setTasks(newTasks)
      event.target.reset()
      setDownloadUrl('')
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  return (
    <Container>
      <Board />
      <Form onSubmit={addingTask}>
        <Row>
          <Col>
            <Form.Control type="text" placeholder="Insert description" id="description_form" />
          </Col>
          <Col>
            <Form.Control type="file" placeholder="Insert file" onChange={fileHandler} />
          </Col>
          <Col>
            <Button type="submit">Add task</Button>
          </Col>        </Row>
      </Form>
    </Container>
  )
}

export default AddTask
