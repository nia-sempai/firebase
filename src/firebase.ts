import { initializeApp } from 'firebase/app'
import {getDatabase, ref} from 'firebase/database'
// ... other firebase imports

export const firebaseApp = initializeApp({
    projectId: 'vuetifybase',
    databaseURL: 'https://vuetifybase-default-rtdb.firebaseio.com',
})

// used for the firestore refs
export const db = getDatabase(firebaseApp,'https://vuetifybase-default-rtdb.firebaseio.com/')
// here we can export reusable database references
export const studentsTableRef = ref(db, 'students');
export const studentById = (index) => {return ref(db,'students/'+index)}
