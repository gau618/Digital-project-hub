import React, { useState, useEffect } from "react";
import YourProjectCard from "./YourProjectCard";
import { useAuth } from "../../AuthContext";
import "./index.scss";
import { GiH2O } from "react-icons/gi";
import Loader from "../Loader/Loader";
export default function YourProjects() {
  const [yourProjects, setYourProjects] = useState([]);
  const [loader,Setloader]=useState(true);
  const [requestedProjects, setRequestedProjects] = useState([]);
  const [projectItems, setProjectItems] = useState([]);
  const [requestedProjectItems, setRequestedProjectItems] = useState([]);
  const { getAllYourProjects, getProjectById } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getAllYourProjects();

      const requestedProjectsList = projects.filter(
        (item) => item.projectStatus === "requested"
      );
      setRequestedProjects(requestedProjectsList);

      const acceptedProjectsList = projects.filter(
        (item) => item.projectStatus === "accepted"
      );
      setYourProjects(acceptedProjectsList);
    };

    fetchProjects();
  }, [getAllYourProjects]);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      const projectDetails = await Promise.all(
        yourProjects.map(async (project) => {
          const projectData = await getProjectById(project.firebaseProjectid);
          return { ...projectData };
        })
      );
      setProjectItems(projectDetails);
      Setloader(false);
    };

    const fetchRequestedProjectDetails = async () => {
      const requestedProjectDetails = await Promise.all(
        requestedProjects.map(async (project) => {
          const projectData = await getProjectById(project.firebaseProjectid);
          return { ...projectData };
        })
      );
      setRequestedProjectItems(requestedProjectDetails);
      Setloader(false);
    };

    if (yourProjects.length > 0) fetchProjectDetails();
    if (requestedProjects.length > 0) fetchRequestedProjectDetails();
  }, [yourProjects, requestedProjects, getProjectById]);

  return (
    <div className="projects">
      <h3>Your Project</h3>
      <hr />
      {loader?<Loader/>:<div className="Yourprojects">
        {projectItems && projectItems.length > 0 ? (
          projectItems.map((item, index) => (
            <YourProjectCard key={index} item={item} />
          ))
        ) : (
          <h2>Oops, currently you don't have any active projects</h2>
        )}
      </div>}
      
      <h3>Applied Project</h3>
      <hr />
      {loader?<Loader/>:<div className="AppliedProjects">
        {requestedProjectItems.map((item, index) => (
          <YourProjectCard key={index} item={item} />
        ))}
      </div>}
      
    </div>
  );
}
