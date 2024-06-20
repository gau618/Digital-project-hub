import React, { useState, useEffect } from "react";
import image from "../../assets/profile.jpg";
import { FaGithub } from "react-icons/fa";
import { IoMdStopwatch } from "react-icons/io";
import { GrProjects } from "react-icons/gr";
import styles from "./Moderator.module.css";
import { useAuth } from "../../AuthContext";
import { auth, db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function Moderatorproject({ item, requested }) {
  const [flipped, setFlipped] = useState(true);
  const [project, setproject] = useState([]);

  const { getProjectById } = useAuth();
  useEffect(() => {
    const fetchProjectDetails = async () => {
      const projectData = await getProjectById(item.firebaseProjectid);
      setproject(projectData);
    };
    fetchProjectDetails();
  }, [item]);
  const updateProjectStatus = async (status) => {
    try {
      // Reference to the specific user's project collection
      const projectRef = doc(
        db,
        "projectApplications",
        item.userId,
        "yourProjects",
        item.projectId
      );
      console.log(status,item.userId, item.projectId);
      await updateDoc(projectRef, { projectStatus: status });
      alert(`Project ${item.projectId} status updated to ${status}`);
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };

  return (
    <div className={styles.card_set}>
      <div
        className={`${styles.requestedprojects} ${
          flipped ? styles.active : ""
        }`}
      >
        <div className={styles.projectCards}>
          <div className={styles.image}>
            <img src={item.PhotoURL || image} alt="" />
          </div>
          <p>
            <strong>{item.name}</strong>
          </p>
          <p>{item.email}</p>
          <div className={styles.seePorject}>
            <button className={styles.button} onClick={() => setFlipped(false)}>
              project
            </button>
            <a href={item.github}>
              <FaGithub />
            </a>
          </div>
          <div className={styles.description}>
            <p>{item.projectDescription}</p>
          </div>
          {requested ? (
            <div className={styles.buttoncontainer}>
              <button
                className={styles.button1}
                onClick={() => updateProjectStatus("accepted")}
              >
                Accept
              </button>
              <button
                className={styles.button2}
                onClick={() => updateProjectStatus("rejected")}
              >
                Reject
              </button>
            </div>
          ) : (
            <button
            className={styles.button2}
            onClick={() => updateProjectStatus("rejected")}
          >
            Reject
          </button>
          )}
        </div>
      </div>
      <div className={`${styles.single_card} ${!flipped ? styles.active : ""}`}>
        <div className={styles.card_img}>
          <img src={project.image} alt="" />
        </div>
        <div className={styles.type_design}>
          <div>
            <GrProjects />
            <p>{project.type}</p>
          </div>
          <div>
            <IoMdStopwatch />
            <p>{project.time}</p>
          </div>
        </div>
        <div className={styles.title}>
          <h4>{project.title}</h4>
        </div>
        <div className={styles.description}>
          <p>{project.description}</p>
        </div>
        <div className={styles.project_price}>
          <button onClick={() => setFlipped(true)}>Application</button>
          <h3>{project.price}</h3>
        </div>
      </div>
    </div>
  );
}
