import React, { useState } from "react";
import "./index.scss";
import { ref, set } from "firebase/database";
import { database } from "../../firebase";
import profilephoto from "../../assets/profile.jpg";

export default function Taskdetailpage() {
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    projectTitle: "",
    taskDuration: "",
    projectDescription: "",
    skillInvolved: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  // this was the part of assignment, have to change it from real time to firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    const skillsArray = formData.skillInvolved.trim().split(/\s+/).filter((skill) => skill);
    const formDataWithSkillsArray = {
      ...formData,
      skillInvolved: skillsArray
    };

    try {
      await set(ref(database, `/UserData/${formData.projectTitle}`), formDataWithSkillsArray);
      alert("Data submitted successfully!");
      setFormData({
        firstName: "",
        secondName: "",
        projectTitle: "",
        taskDuration: "",
        projectDescription: "",
        skillInvolved: ""
      }); // Reset form data after submission
    } catch (error) {
      console.error("Error writing to Firebase Database", error);
      alert("Error submitting data");
    }
  };

  return (
    <div className="secondpage-container">
      <div className="left-container" data-aos="fade-right">
        <h4>Your Profile</h4>
        <div className="imgdiv">
          <img src={profilephoto} alt="Profile" />
        </div>
        <div className="about">
          <h5>Kin shuk</h5>
          <p>Web Development</p>
        </div>
        <div className="project-points">
          <div className="item">
            <h5>30+</h5>
            <p>Projects</p>
          </div>
          <div className="item border">
            <h5>4K+</h5>
            <p>Points</p>
          </div>
          <div className="item">
            <h5>20K+</h5>
            <p>Followers</p>
          </div>
        </div>
        <div className="button1">
          <button>UPLOAD NEW PHOTO</button>
        </div>
        <div className="button2">
          <button>EDIT PROFILE</button>
        </div>
      </div>
      <div className="right-container" data-aos="fade-up">
        <div className="basic-info">
          <h3>Basic info of Project</h3>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="parsonal-details">
              <div className="first-name">
                <label htmlFor="firstName">FIRST NAME</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="first-name">
                <label htmlFor="secondName">SECOND NAME</label>
                <input
                  type="text"
                  id="secondName"
                  name="secondName"
                  value={formData.secondName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="title-duration">
              <div className="Project-title">
                <label htmlFor="projectTitle">PROJECT TITLE</label>
                <input
                  type="text"
                  id="projectTitle"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleChange}
                />
              </div>
              <div className="Project-title">
                <label htmlFor="taskDuration">TASK DURATION</label>
                <input
                  type="text"
                  id="taskDuration"
                  name="taskDuration"
                  value={formData.taskDuration}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="project-description">
              <label htmlFor="projectDescription">PROJECT DESCRIPTION</label>
              <textarea
                className="text-area"
                id="projectDescription"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="skill">
              <label htmlFor="skillInvolved">SKILL INVOLVED</label>
              <input
                type="text"
                id="skillInvolved"
                name="skillInvolved"
                value={formData.skillInvolved}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
