 /*USEFULL FIREBASE REFERENCES:
      console.log('responseDocRef: ', responseDocRef)
      console.log('responseDocRef.data(): ', responseDocRef.data())
      console.log('responseDocRef.data().tasks: ', responseDocRef.data().tasks)
      console.log('responseDocRef.data().tasks[0].downloadUrl: ', responseDocRef.data().tasks[0].downloadUrl)
    */

      import React from 'react';
      import { useNavigate } from 'react-router-dom';
      import { Button } from 'react-bootstrap';
      import { getAuth, deleteUser } from 'firebase/auth';
      import firebaseApp from '../Config/firebase';
      import { getDoc, getFirestore, doc, deleteDoc } from 'firebase/firestore';
      import { getStorage, ref, deleteObject } from 'firebase/storage';
      
      const Profile = () => {
        const auth = getAuth(firebaseApp);
        const firestore = getFirestore(firebaseApp);
        const user = auth.currentUser;
        const documentId = user.email;
        const navigate = useNavigate();
        const storage = getStorage(firebaseApp);
      
        const handleDeleteCurrentUser = async () => {
          try {
            // Deleting tasklist files and complete tasklist before deleting the entire user register
            const docRef = doc(firestore, `usersDocs/${documentId}`);
            const responseDocRef = await getDoc(docRef);
            
            if (responseDocRef.exists) {
              const tasklist = responseDocRef.data().tasks;
      
              // Deleting tasklist files, creating a promises array
              const deletingPromises = tasklist.map(async (t) => {
                const downloadUrl = t.downloadUrl;
                const firebaseUrl = 'https://firebasestorage';
      
                if (downloadUrl.includes(firebaseUrl)) {
                  const fileRef = ref(storage, downloadUrl);
                  await deleteObject(fileRef);
                  console.log('File deleted successfully:', downloadUrl);
                }else{
                  console.log('url not found in storage')
                }
              });
      
              // Waiting for all the promises to complete
              await Promise.all(deletingPromises);
      
              // Deleting the tasklist
              await deleteDoc(doc(firestore, `usersDocs/${documentId}`));
      
              // Deleting the user account
              await deleteUser(user);
      
              
            }
          } catch (error) {
            console.error('Ocurrió un error al eliminar la cuenta', error);
          }
          navigate('/');
              console.log('La cuenta se eliminó exitosamente');
        };
      
        return (
          <div>
            <h1>Profile</h1>
            <Button variant="warning" onClick={handleDeleteCurrentUser}>
              Eliminar mi cuenta
            </Button>
          </div>
        );
      };
      
      export default Profile;
      