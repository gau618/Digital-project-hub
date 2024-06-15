import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db ,storage} from './firebase';
import { doc, setDoc, getDoc, collection, addDoc,updateDoc, getDocs,} from 'firebase/firestore';
import {imagePaths} from './Data/Data1';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initialdata1 } from './Data/Data1';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userEmail,setUserEmail]=useState('');
  const [userName,setUserName]=useState('');
  const [userId,setUserId]=useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const signUp =  async (email, password, name) => {
    setUserEmail(email);
    setUserName(name);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Sign-up successful:", user);
      })
      .catch((error) => {
        console.error("Sign-up failed:", error);
      });
      
  };

  const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const logout = () => signOut(auth);

  const saveProfile = async (name, email, github, skills, aboutMe) => {
    const userId = auth.currentUser.uid;
    const profileRef = doc(db, 'profiles', userId);
    await setDoc(profileRef, {
      name,
      email,
      github,
      skills,
      aboutMe,
    });
  };
  const addPastProject = async (projectName, projectDescription) => {
    const userId = auth.currentUser.uid;
    console.log(projectName);
    const projectsRef = collection(db, 'profiles', userId, 'pastProjects');
    await addDoc(projectsRef, {
      projectName,
      projectDescription,
    });
  };
    const getPastProjects = async (userId) => {
    const projectsRef = collection(db, 'profiles', userId, 'pastProjects');
    const projectsSnapshot = await getDocs(projectsRef);
    const projectsList = projectsSnapshot.docs.map(doc => doc.data());
    return projectsList;
  };
    getPastProjects();
  const updateProfile=async(value)=>{
    const userId = auth.currentUser.uid;
    const ref=doc(db,'profiles',`${userId}`)
    console.log(value);
    await updateDoc(ref,value);
  }
  const GetProfile = async () => {
    const userId = auth.currentUser.uid;
    const ref = doc(db, 'profiles', userId);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data() : null;
  };
  const uploadImage = async (filePath, storagePath) => {
    const response = await fetch(filePath);
    const blob = await response.blob();
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(storageRef);
    return url;
  };
  const uploadAllImages = async () => {
    const uploadPromises = imagePaths.map(image => uploadImage(image.filePath, image.storagePath));
    const urls = await Promise.all(uploadPromises);
    return urls;
  };
  const getUploadedImagesUrls = async () => {
    const urls = await uploadAllImages();
    console.log('All images uploaded and URLs obtained:');
    return urls;
  };

const storeInitialData = async () => {
  try {
    // Get the URLs for all images
    const urls = await getUploadedImagesUrls();
    
    // Update initialdata1 with these URLs
    initialdata1.forEach((data, index) => {
      data.image = urls[index];
    });

    // Store updated data in Firestore
    const collectionRef = collection(db, 'projects');
    for (const data of initialdata1) {
      await addDoc(collectionRef, data);
    }
    console.log('Initial data added to Firestore successfully');
  } catch (error) {
    console.error('Error adding initial data to Firestore: ', error);
  }
};
const getAllProjects = async () => {
  try {
    const projectsCollection = collection(db, 'projects');
    const projectSnapshot = await getDocs(projectsCollection);
    const projectList = projectSnapshot.docs.map(doc => doc.data());
    return projectList;
  } catch (error) {
    console.error('Error fetching projects: ', error);
    return [];
  }
};
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        resetPassword,
        logout,
        saveProfile,
        GetProfile,
        userEmail,
        userName,
        updateProfile,
        addPastProject,
        getPastProjects,
        getAllProjects,
        storeInitialData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
