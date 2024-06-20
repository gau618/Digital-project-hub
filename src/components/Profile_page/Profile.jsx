import React, { useState, useEffect } from "react";
import "./index.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { LiaCoinsSolid } from "react-icons/lia";
import profile from "../../assets/profile.jpg";
import { useAuth } from "../../AuthContext";
import { auth, storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [skills, setSkills] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [points, setPoints] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [role, setRole] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [addProject, setAddProject] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectList, setProjectList] = useState([]);
  const [moderator, setmoderator]=useState();
  const { saveProfile, GetProfile, user, userName, userEmail, updateProfile, addPastProject, getPastProjects } = useAuth();

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const data = await GetProfile();
        if (data) {
          setName(data.name || userName);
          setEmail(data.email || userEmail);
          setGithub(data.github || "");
          setSkills(data.skills || "");
          setAboutMe(data.aboutMe || "");
          setRole(data.role || "");
          setmoderator(data.isModerator);
          // Fetch and set user's profile image
          fetchProfileImage();
        }
      };
      fetchProfile();
    }
  }, [user, GetProfile, userName, userEmail]);

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (auth.currentUser) {
        try {
          const userId = auth.currentUser.uid;
          const imageRef = `profilePhotos/${userId}`;
          const imageUrl = await getDownloadURL(ref(storage, imageRef));
          setPhotoURL(imageUrl);
        } catch (error) {
          console.error("Error fetching profile image:", error);
        }
      }
    };
    fetchProfileImage();
  }, [auth.currentUser]);

  useEffect(() => {
    const fetchPastProjects = async () => {
      if (auth.currentUser) {
        try {
          const userPastprojectList = await getPastProjects(auth.currentUser.uid);
          setProjectList(userPastprojectList || []);
        } catch (error) {
          console.error("Error fetching past projects:", error);
        }
      }
    };
    fetchPastProjects();
  }, [auth.currentUser, getPastProjects]);

  const saveMyProfile = () => {
    saveProfile(name, email, github, skills, aboutMe);
    setEditMode(false);
  };

  const savePastProject = () => {
    setAddProject(false);
    addPastProject(projectName, projectDescription);
  };

  const uploadImg = () => {
    if (photo === null) {
      return;
    }
    const userId = auth.currentUser.uid;
    const imageRef = ref(storage, `profilePhotos/${userId}`);
    uploadBytes(imageRef, photo)
      .then(() => {
        alert("Image Uploaded");
        fetchProfileImage();
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const SaveProfile = () => {
    setProfileEditMode(false);
    uploadImg();
    updateProfile({
      role: role,
    });
  };
  const BecomeModerator=()=>{
    setmoderator(true)
    updateProfile({
      isModerator:true
    });
    console.log("Done");
  }
  return (
    <>
      {user ? (
        <div className="Profile_container">
          <div className="left_container">
            <div className="profile">
              <img
                src={photoURL || profile}
                alt="Profile"
                style={{ cursor: "pointer" }}
              />
              {profileEditMode ? (
                <>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Role"
                  />
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                    style={{ display: "none" }}
                  />
                  <div className="edit_points">
                    <div className="points">
                      <button>
                        <label htmlFor="file">Import</label>
                      </button>
                    </div>
                    <div className="edit_profile">
                      <button onClick={SaveProfile}>Save</button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    className="readOnly"
                    readOnly
                    value={name}
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    className="readOnly"
                    readOnly
                    value={role}
                    placeholder="Role"
                  />
                  <div className="edit_points">
                    <div className="points">
                      <button>
                        <LiaCoinsSolid style={{ color: "yellow" }} />
                        {points}
                      </button>
                    </div>
                    <div className="edit_profile">
                      <button onClick={() => setProfileEditMode(true)}>Edit</button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="moderator">
           {moderator?"":<button className="button1" onClick={BecomeModerator}>Become Moderator</button>}
           </div>
          </div>
          <hr />
          <div className="right_container">
            <div className="details">
              {/* Profile Details */}
              <div className="Name items">
                <label htmlFor="name">Name</label>
                {editMode ? (
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <input
                    readOnly
                    type="text"
                    id="name"
                    value={name}
                    className="Hide"
                  />
                )}
              </div>
              <div className="Email items">
                <label htmlFor="email">Email</label>
                {editMode ? (
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <input
                    readOnly
                    type="text"
                    id="email"
                    value={email}
                    className="Hide"
                  />
                )}
              </div>
              <div className="Github items">
                <label htmlFor="Github">Github</label>
                {editMode ? (
                  <input
                    type="text"
                    id="Github"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                  />
                ) : (
                  <input
                    readOnly
                    type="text"
                    id="Github"
                    value={github}
                    className="Hide"
                  />
                )}
              </div>
              <div className="skills items">
                <label htmlFor="skill">Skills</label>
                {editMode ? (
                  <input
                    type="text"
                    id="skill"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                ) : (
                  <input
                    readOnly
                    type="text"
                    id="skill"
                    value={skills}
                    className="Hide"
                  />
                )}
              </div>
              <div className="About_Me">
                <label htmlFor="textArea">About Me</label>
                {editMode ? (
                  <textarea
                    id="textArea"
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
                  ></textarea>
                ) : (
                  <textarea
                    readOnly
                    id="textArea"
                    value={aboutMe}
                    className="Hide"
                  ></textarea>
                )}
              </div>
              <div className="edit_button">
                {!editMode && (
                  <button onClick={() => setEditMode(true)}>Edit</button>
                )}
              </div>
              {editMode && (
                <div className="save_button">
                  <button className="button1" onClick={saveMyProfile}>
                    Save
                  </button>
                  <button className="button2" onClick={() => setEditMode(false)}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <div className="projects">
              <hr />
              <div className="project_header">
                <h4>Past Projects</h4>
                {addProject ? (
                  <>
                  <button onClick={savePastProject}>Save</button>
                  <button onClick={()=>(setAddProject(false))}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => { setAddProject(true); }}>ADD Project</button>
                )}
              </div>
              <div className="project_box">
                {addProject ? (
                  <>
                    <div className="projectname">
                      <label htmlFor="projectname">Project Name</label>
                      <input type="text" id='projectname' onChange={(e) => { setProjectName(e.target.value); }} />
                    </div>
                    <div className="projectDescription">
                      <label htmlFor="projectDescription">Project Description</label>
                      <textarea id="projectDescription" onChange={(e) => { setProjectDescription(e.target.value); }}></textarea>
                    </div>
                  </>
                ) : (
                  <div className="Project_list">
                    {projectList.map((item, index) => (
                      <div className="myProject" key={index}>
                        <h5>{item.projectName}</h5>
                        <p>{item.projectDescription}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4>Not Found</h4>
      )}
    </>
  );
}
