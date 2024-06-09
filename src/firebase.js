import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC18LIDcaAQ5Rs0OdTDXWAhiiFNH4RUzA0",
  authDomain: "digital-hub-1d53a.firebaseapp.com",
  databaseURL: "https://digital-hub-1d53a-default-rtdb.firebaseio.com",
  projectId: "digital-hub-1d53a",
  storageBucket: "digital-hub-1d53a.appspot.com",
  messagingSenderId: "236394643105",
  appId: "1:236394643105:web:2f73572ccd1b988d823ae0",
  measurementId: "G-ZXV2YWP5SJ"
  };
  

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  export const auth = getAuth(app);
  
  export { database };
