import React, { useEffect, useState } from "react";
import styles from "./Moderator.module.css";
import Moderatorproject from "./moderatorproject";
import { useAuth } from "../../AuthContext";
import Loader from "../Loader/Loader";

export default function Moderator() {
  const [moderatorProjectDetails, setModeratorProjectDetails] = useState([]);
  const [moderatorRequestedProjects, setModeratorRequestedProjects] = useState([]);
  const [moderatorProjects, setModeratorProjects] = useState([]);
  const [loader, setLoader] = useState(true);
  const { getProjectsByModerator } = useAuth();
  const moderatorId = "ab1C4D9e";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const matchingProjects = await getProjectsByModerator(moderatorId);
        setModeratorProjectDetails(matchingProjects);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, [getProjectsByModerator, moderatorId]);

  useEffect(() => {
    if (moderatorProjectDetails.length > 0) {
      const requestedProjectsList = moderatorProjectDetails.filter(
        (item) => item.projectStatus === "requested"
      );
      setModeratorRequestedProjects(requestedProjectsList);

      const acceptedProjectsList = moderatorProjectDetails.filter(
        (item) => item.projectStatus === "accepted"
      );
      setModeratorProjects(acceptedProjectsList);
    }
  }, [moderatorProjectDetails]);

  return (
    <div className={styles.Moderatorcontainer}>
      <h3>Requested Projects</h3>
      <hr />
      {loader ? (
        <Loader />
      ) : moderatorRequestedProjects && moderatorRequestedProjects.length > 0 ? (
        <div className={styles.Request}>
          {moderatorRequestedProjects.map((project, index) => (
            <Moderatorproject key={index} item={project} requested={true} />
          ))}
        </div>
      ) : (
        <h2 className={styles.message}>Currently no project requests are for you</h2>
      )}
      <h3>Your Projects</h3>
      <hr />
      {loader ? (
        <Loader />
      ) : (
        <div className={styles.ModeratorProjects}>
          {moderatorProjects.map((project, index) => (
            <Moderatorproject key={index} item={project} requested={false} />
          ))}
        </div>
      )}
    </div>
  );
}
