import React, { useContext, useState } from 'react'
import TaskListContext from '../Contexts/TaskListContext';
import { Form, FormControl, Button } from 'react-bootstrap'
import firebaseApp from '../Config/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const SearchTask = () => {

  const firestore = getFirestore(firebaseApp);
  const [ term, setTerm] = useState('');
  const [ results, setResults ] = useState([]);
  const context = useContext(TaskListContext);

  console.log('term: ', term);
  console.log('results: ', results);


  const handleSearch = async (e) => {
    e.preventDefault();
    // Realiza la búsqueda en Firebase Firestore
    const documentId = context.globalUser.email;
    const docRef = doc(firestore, `usersDocs/${documentId}`);
    const querySnapshot = await getDoc(docRef);
    console.log('querySnapshot: ', querySnapshot);

    // Obtiene los resultados de la búsqueda
    const tasklistResponse = querySnapshot.data().tasks;
    const results = tasklistResponse.filter((t) => t.description.toLowerCase().includes(term.toLowerCase()));
    setResults(results);
  };

  return (
    <div>
      <Form onSubmit={handleSearch}>
        <FormControl
          type='text'
          placeholder='enter your search term'
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <Button type='submit'>Search</Button>
      </Form>
      <h1>Results</h1>
      {results.length > 0 && (
        <div>
          <h2>Resultados de la búsqueda:</h2>
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result.description}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
};

export default SearchTask;
