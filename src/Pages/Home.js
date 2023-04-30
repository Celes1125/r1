import React, { useEffect, useContext } from 'react'
import TaskListContext from '../Contexts/TaskListContext'
import { Container } from 'react-bootstrap'
import TaskList from '../Components/TaskList'
import firebaseApp from '../Config/firebase'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
const firestore = getFirestore(firebaseApp)
const styles = {
  top_container: {
    marginTop: '50px',
    width: '80%'

  }

}

const Home = () => {
  const context = useContext(TaskListContext)
  async function searchOrCreateDocs (idDocumento) {
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
      await setDoc(docRef, { tasks: [...context.fakeData] })
      const responseDocRef = await getDoc(docRef)
      const dataResponse = responseDocRef.data()
      return dataResponse.tasks
    }
  }

  useEffect(
    () => {
      async function fetchTasks () {
        const fetchedTasks = await searchOrCreateDocs(context.globalUser.email)
        context.setTasks(fetchedTasks)
      }
      fetchTasks()
    },
    []
  )

  return (
        <TaskListContext.Consumer>
            {context =>
                <Container style={styles.top_container}>
                    <div>

                        {context.tasks ? <TaskList /> : null}
                    </div>

                </Container>

            }
        </TaskListContext.Consumer>
  )
}

export default Home
