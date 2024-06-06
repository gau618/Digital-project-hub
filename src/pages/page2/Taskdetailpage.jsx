import React from "react";
import "./index.scss";
import { useState } from "react";
import profilephoto from '../../assets/profile.jpg'
export default function Taskdetailpage(){
  const [initialData, setData] = useState([]);
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
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const skillsArray = formData.skillInvolved.trim().split(/\s+/).filter(skill => skill);
    const formDataWithSkillsArray = {
      ...formData,
      skillInvolved: skillsArray
    };

    // Send the form data to Firebase Realtime Database
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataWithSkillsArray)
      };
      const response = await fetch('https://digital-hub-1d53a-default-rtdb.firebaseio.com/UserData.json', options);
      if (response.ok) {
        alert('Message Sent');
        const updatedData = [...initialData, formDataWithSkillsArray];
        setData(updatedData);
        localStorage.setItem('formdata', JSON.stringify(updatedData));
        console.log(formDataWithSkillsArray);
        setFormData({
          firstName: "",
          secondName: "",
          projectTitle: "",
          taskDuration: "",
          projectDescription: "",
          skillInvolved: ""
        });
      } else {
        alert("Error Occurred");
      }
    } catch (error) {
      alert("Error Occurred");
      console.error("Error posting data:", error);
    }
  };
  return (
    <>
      <div className="secondpage-container">
        <div className="left-container" data-aos="fade-right">
          <h4>Your Profile</h4>
          <div className="imgdiv">
          <img src={profilephoto} alt="" />
          </div>
          <div className="about">
            <h5>Kin shuk</h5>
            <p> Web Development</p>
          </div>
          <div className="project-points">
            <div className="item">
              <h5>30+</h5>
              <p>Project</p>
            </div>
            <div className="item border">
              <h5>4K+</h5>
              <p>Points</p>
            </div>
            <div className="item">
              <h5>20K+</h5>
              <p>followers</p>
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
                      <label htmlFor="name"> FIRST NAME</label>
                      <input type="text" id='name' name="firstName" value={formData.firstName} onChange={handleChange} />
                    </div>
                    <div className="first-name">
                    <label htmlFor="nameS"> SECOND  NAME</label>
                    <input type="text" id='nameS' name="secondName" value={formData.secondName} onChange={handleChange} />
                    </div>
                </div>
                <div className="title-duration">
                <div className="Project-title">
                  <label htmlFor="title"> PROJECT TITLE</label>
                  <input type="text" id="title" name="projectTitle" value={formData.projectTitle} onChange={handleChange} />
                </div>
                <div className="Project-title">
                  <label htmlFor="duration">TASK DURATION</label>
                  <input type="text" id='durations' name="taskDuration" value={formData.taskDuration} onChange={handleChange} />
                 </div>
                 </div>
                <div className="project-discription">
                  <label htmlFor="discription">PROJECT DISCRIPTION</label>
                  <textarea  class="text-area"id="description" name="projectDescription" value={formData.projectDescription} onChange={handleChange}></textarea>
                </div>
                
                 <div className="skill">
                  <label htmlFor="skilles"> SLILL INVOLVED</label>
                  <input type="text" id='skills' name="skillInvolved" value={formData.skillInvolved} onChange={handleChange} />
                 </div>
                 <button type="submit">
                  Submit
                 </button>
            </form>
          </div>
        </div>
      </div>
      </>
  );
}
