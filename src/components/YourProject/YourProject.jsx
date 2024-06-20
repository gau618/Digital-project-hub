import React, { useState, useEffect } from "react";
import YourProjectCard from "./YourProjectCard";
import { useAuth } from "../../AuthContext";
import "./index.scss";
import Loader from "../Loader/Loader";

export default function YourProjects() {
  const [yourProjects, setYourProjects] = useState([]);
  const [loader, setLoader] = useState(false);
  const [requestedProjects, setRequestedProjects] = useState([]);
  const [projectItems, setProjectItems] = useState([]);
  const [requestedProjectItems, setRequestedProjectItems] = useState([]);
  const [rejectedProjects, setRejectedProjects] = useState([]);
  const [rejectedProjectItems, setRejectedProjectItems] = useState([]);
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

      const rejectedProjectsList = projects.filter(
        (item) => item.projectStatus === "rejected"
      );
      setRejectedProjects(rejectedProjectsList);
    };

    fetchProjects();
  }, [getAllYourProjects]);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoader(true);
      const projectDetails = await Promise.all(
        yourProjects.map(async (project) => {
          const projectData = await getProjectById(project.firebaseProjectid);
          return { ...projectData };
        })
      );
      setProjectItems(projectDetails);
      setLoader(false);
    };

    const fetchRequestedProjectDetails = async () => {
      setLoader(true);
      const requestedProjectDetails = await Promise.all(
        requestedProjects.map(async (project) => {
          const projectData = await getProjectById(project.firebaseProjectid);
          return { ...projectData };
        })
      );
      setRequestedProjectItems(requestedProjectDetails);
      setLoader(false);
    };

    const fetchRejectedProjectDetails = async () => {
      setLoader(true);
      const rejectedProjectDetails = await Promise.all(
        rejectedProjects.map(async (project) => {
          const projectData = await getProjectById(project.firebaseProjectid);
          return { ...projectData };
        })
      );
      setRejectedProjectItems(rejectedProjectDetails);
      setLoader(false);
    };

    if (yourProjects.length > 0) fetchProjectDetails();
    if (requestedProjects.length > 0) fetchRequestedProjectDetails();
    if (rejectedProjects.length > 0) fetchRejectedProjectDetails();
  }, [yourProjects, requestedProjects, rejectedProjects, getProjectById]);

  return (
    <div className="projects">
      <h3>Your Projects</h3>
      <hr />
      {loader ? (
        <Loader />
      ) : (
        <div className="Yourprojects">
          {projectItems && projectItems.length > 0 ? (
            projectItems.map((item, index) => (
              <YourProjectCard key={index} item={item} />
            ))
          ) : (
            <h2>Oops, currently you don't have any active projects</h2>
          )}
        </div>
      )}

      <h3>Applied Projects</h3>
      <hr />
      {loader ? (
        <Loader />
      ) : (
        <div className="Yourprojects">
          {requestedProjectItems && requestedProjectItems.length > 0 ? (
            requestedProjectItems.map((item, index) => (
              <YourProjectCard key={index} item={item} />
            ))
          ) : (
            <h2>Oops, currently you don't have any Applied projects</h2>
          )}
        </div>
      )}

      <h3>Rejected Projects</h3>
      <hr />
      {loader ? (
        <Loader />
      ) : (
        <div className="AppliedProjects">
          {rejectedProjectItems.map((item, index) => (
            <YourProjectCard key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
