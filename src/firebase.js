import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  databaseURL: "https://my-projects-bac9c-default-rtdb.firebaseio.com/",
  apiKey: "AIzaSyClsoqt087C7KH3FL0v3FVHJHrTancmre8",
  authDomain: "my-projects-bac9c.firebaseapp.com",
  projectId: "my-projects-bac9c",
  storageBucket: "my-projects-bac9c.appspot.com",
  messagingSenderId: "664651647626",
  appId: "1:664651647626:web:f3cd690d12c8dceca43b73",
  measurementId: "G-GTGE5ZKDWH"
  };
  

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  export const auth = getAuth(app);
  export const db= getFirestore(app);
  export const storage=getStorage(app);
  export { database };
