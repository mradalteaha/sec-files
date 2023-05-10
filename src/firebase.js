import {initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'
import {initializeFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBvVtuVo9oeONE5iK9IjLJ059LHKEjP7KE",
    authDomain: "sec-files.firebaseapp.com",
    projectId: "sec-files",
    storageBucket: "sec-files.appspot.com",
    messagingSenderId: "327841188751",
    appId: "1:327841188751:web:0de8999a9b32ccf0b959fa",
    measurementId: "G-CYFR8D9JGC"
  };

// Initialize Firebase
//const app = initializeApp(firebaseConfig);


const firebase = initializeApp(firebaseConfig)
export const storage = getStorage(firebase)
export const db = initializeFirestore(firebase , {experimentalForceLongPolling: true ,}) 
export default firebase;


  