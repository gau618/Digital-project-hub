import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc, getDoc, collection, addDoc,updateDoc, getDocs} from 'firebase/firestore';

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
    console.log(projectsList);
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
        getPastProjects
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
