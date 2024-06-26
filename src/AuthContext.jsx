import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db, storage } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { imagePaths } from "./Data/Data1";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initialdata1 } from "./Data/Data1";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const signUp = async (email, password, name) => {
    setUserEmail(email);
    setUserName(name);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = auth.currentUser;
      await saveInitialProfile({
        name,
        email,
        github: "", // Initialize with empty values or defaults
        skills: "",
        aboutMe: "",
        role: "user", // Assuming default role is "user"
        moderatorId: "",
        isModerator:false // Initialize with empty value for moderatorId
      });
      console.log("Sign-up successful:", currentUser);
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };

  const saveInitialProfile = async ({
    name,
    email,
    github,
    skills,
    aboutMe,
    role,
    moderatorId,
  }) => {
    const userId = auth.currentUser.uid;
    const profileRef = doc(db, "profiles", userId);
    try {
      await setDoc(profileRef, {
        name,
        email,
        github,
        skills,
        aboutMe,
        role,
        moderatorId,
      });
      console.log("Initial profile saved successfully");
    } catch (error) {
      console.error("Error saving initial profile:", error);
    }
  };

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signInWithGoogle = () =>signInWithPopup(auth, new GoogleAuthProvider());
  

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const logout = () => signOut(auth);

const saveProfile = async (name, email, github, skills, aboutMe) => {
  const userId = auth.currentUser.uid;
  const profileRef = doc(db, "profiles", userId);

  try {
    const docSnapshot = await getDoc(profileRef);

    if (docSnapshot.exists()) {
      const currentData = docSnapshot.data();

      // Merge current data with updated fields
      const updatedData = {
        ...currentData,
        name,
        email,
        github,
        skills,
        aboutMe,
      };

      // Update document with merged data
      await setDoc(profileRef, updatedData);
      console.log("Profile updated successfully");
    } else {
      // If the document does not exist, create it with the provided data
      const newData = {
        name,
        email,
        github,
        skills,
        aboutMe,
      };

      await setDoc(profileRef, newData);
      console.log("New profile document created");
    }
  } catch (error) {
    console.error("Error saving profile:", error);
  }
};

  const addPastProject = async (projectName, projectDescription) => {
    const userId = auth.currentUser.uid;
    console.log(projectName);
    const projectsRef = collection(db, "profiles", userId, "pastProjects");
    await addDoc(projectsRef, {
      projectName,
      projectDescription,
    });
  };
  const getPastProjects = async (userId) => {
    const projectsRef = collection(db, "profiles", userId, "pastProjects");
    const projectsSnapshot = await getDocs(projectsRef);
    const projectsList = projectsSnapshot.docs.map((doc) => doc.data());
    return projectsList;
  };
  getPastProjects();
  const updateProfile = async (value) => {
    const userId = auth.currentUser.uid;
    const ref = doc(db, "profiles", `${userId}`);
    console.log(value);
    await updateDoc(ref, value);
  };
  const GetProfile = async () => {
    const userId = auth.currentUser.uid;
    const ref = doc(db, "profiles", userId);
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
    const uploadPromises = imagePaths.map((image) =>
      uploadImage(image.filePath, image.storagePath)
    );
    const urls = await Promise.all(uploadPromises);
    return urls;
  };
  const getUploadedImagesUrls = async () => {
    const urls = await uploadAllImages();
    console.log("All images uploaded and URLs obtained:");
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
      const collectionRef = collection(db, "projects");
      for (const data of initialdata1) {
        await addDoc(collectionRef, data);
      }
      console.log("Initial data added to Firestore successfully");
    } catch (error) {
      console.error("Error adding initial data to Firestore: ", error);
    }
  };
  const getAllProjects = async () => {
    try {
      const projectsCollection = collection(db, "projects");
      const projectSnapshot = await getDocs(projectsCollection);
      const projectList = projectSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return projectList;
    } catch (error) {
      console.error("Error fetching projects: ", error);
      return [];
    }
  };
  const getProjectById = async (id) => {
    try {
      const projectDoc = doc(db, "projects", id);
      const projectSnapshot = await getDoc(projectDoc);
      if (projectSnapshot.exists()) {
        return { id: projectSnapshot.id, ...projectSnapshot.data() };
      } else {
        console.error("No such project!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching project:", error);
      return null;
    }
  };
  const applyforproject = async (projectId, userApplication) => {
    console.log(projectId);
    const userId = auth.currentUser.uid;
    const projectApplicationsRef = doc(db, 'projectApplications', userId); 
    const yourProjectsRef = collection(projectApplicationsRef, 'yourProjects'); 
  
    try {
  
      const docSnapshot = await getDoc(projectApplicationsRef);
  
      if (docSnapshot.exists()) {

        await updateDoc(projectApplicationsRef, {
          ...userApplication,
          projectId: projectId
        });
  
     
        await setDoc(doc(yourProjectsRef, projectId), {
          ...userApplication, 
          projectId: projectId 
        });
  
        console.log('Project application updated successfully');
      } else {
      
        await setDoc(projectApplicationsRef, {
          userId: userId,
          projectId: projectId,
          ...userApplication
        });
  
       
        await setDoc(doc(yourProjectsRef, projectId), {
          ...userApplication, 
          projectId: projectId 
        });
  
        console.log('New project application document created');
      }
    } catch (error) {
      console.error('Error saving project application:', error);
      // Handle error (e.g., show error message to user)
    }
  };
  const getAllYourProjects = async () => {
    try {
      const userId = auth.currentUser.uid; // Get the current user's ID
      const projectApplicationsRef = doc(db, 'projectApplications', userId); // Reference to user's project applications document
      const yourProjectsRef = collection(projectApplicationsRef, 'yourProjects'); // Reference to subcollection 'yourProjects'
  
      const querySnapshot = await getDocs(yourProjectsRef); // Fetch all documents from 'yourProjects' subcollection
  
      let projects = [];
      querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() }); // Push each document's data into the projects array
      });
  
      console.log('Projects retrieved successfully:', projects);
      return projects;
    } catch (error) {
      console.error('Error retrieving projects:', error);
      // Handle error (e.g., show error message to user)
      return [];
    }
  };
  
const getProjectsByModerator = async (moderatorId) => {
  try {
    const projectApplicationsRef = collection(db, 'projectApplications');
    const projectApplicationsSnapshot = await getDocs(projectApplicationsRef);

    let matchingProjects = [];

    const promises = projectApplicationsSnapshot.docs.map(async (projectDoc) => {
      const yourProjectsRef = collection(doc(db, 'projectApplications', projectDoc.id), 'yourProjects');
      const yourProjectsQuery = query(yourProjectsRef, where('YourModerator', '==', moderatorId));
      const yourProjectsSnapshot = await getDocs(yourProjectsQuery);

      yourProjectsSnapshot.forEach(doc => {
        matchingProjects.push(doc.data());
      });
    });

    await Promise.all(promises);

    return matchingProjects;
  } catch (error) {
    console.error('Error fetching projects:', error);
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
        storeInitialData,
        getProjectById,
        applyforproject,
        getAllYourProjects,
        getProjectsByModerator
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
