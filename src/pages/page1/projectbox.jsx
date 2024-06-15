import React,{ useState, useEffect } from "react";
import "./index.scss";
import ProjectBoxCard from "./ProjectBoxCard";
import { initialdata1 } from "../../Data/Data1";
import { useAuth } from '../../AuthContext';
export default function Projectbox() {
  const [projects, setProjects] = useState([]);
  const { getAllProjects } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getAllProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);
  return (
    <>
      <div className="project-box" id="projects-section">
        <div className="projectboxheader">
          <div>
            <h2>Popular Project for You</h2>
            <p>Get the best project on best price and with best Mentors</p>
          </div>
          <div className="buttons">
            <button>Latest</button>
            <button>Populor</button>
          </div>
        </div>
        <div className="project-box-cards-container">
          {projects.map((item, index) => (
            <ProjectBoxCard
              key={index}
              item={item}
              index={index} // Pass index to determine left or right card
            />
          ))}
        </div>
      </div>
    </>
  );
}

