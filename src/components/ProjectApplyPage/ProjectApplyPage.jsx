import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdStopwatch } from "react-icons/io";
import { GrProjects } from "react-icons/gr";
import "./index.scss";
import profile from "../../assets/profile.jpg"
import { auth,storage  } from '../../firebase';
import { getDownloadURL, ref } from "firebase/storage"; 
export default function ProjectApplyPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [mobile, setMobile] = useState("");
  const [PastProjectLink, setPastProjectLink] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [PhotoURL,setPhotoURL]=useState();
  const [apply, setApply] = useState(true);
  const Navigate = useNavigate();
  const { getProjectById, GetProfile, user ,applyforproject} = useAuth();
  const { id } = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    const fetchProject = async () => {
      const project = await getProjectById(id);
      setItem(project);
    };
    fetchProject();
  }, [id, getProjectById]);
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
    if (user) {
      const fetchProfile = async () => {
        const data = await GetProfile();
        if (data) {
          setName(data.name);
          setEmail(data.email);
          setGithub(data.github);
        }
      };
      fetchProfile();
    }
  }, [user, GetProfile]);

  const submitApply = (e) => {
    e.preventDefault();
    // Validate required fields
    if (
      name === "" ||
      email === "" ||
      mobile === "" ||
      !/^\d{10}$/.test(mobile) ||
      PastProjectLink === "" ||
      projectDescription === ""
    ) {
      alert("Please fill all required fields correctly.");
      return;
    }
    const userApplicationDetails={
        name,
        email,
        mobile,
        PastProjectLink,
        projectDescription,
        YourModerator:item.moderatorId,
        github,
        projectStatus:'requested',
        firebaseProjectid:id,
        PhotoURL:PhotoURL||profile,
        userId:auth.currentUser.uid
    }
    console.log(userApplicationDetails);
    applyforproject(item.projectId,userApplicationDetails);
    setApply(false);
  };

  const editApply = (e) => {
    setApply(true);
  };
  return (
    <div className="projectApplyContainer" data-aos="fade-up">
    <div className="left-container">
      <div className="single-card">
        <div className="card-img">
          <img src={item.image} alt="" />
        </div>
        <div className="type-design">
          <div>
            <GrProjects />
            <p>{item.type}</p>
          </div>
          <div>
            <IoMdStopwatch />
            <p>{item.time}</p>
          </div>
        </div>
        <div className="title">
          <h4>{item.title}</h4>
        </div>
        <div className="discription">
          <p>{item.description}</p>
        </div>
        <div className="project-price">
          <button onClick={() => Navigate("/")}>Home</button>
          <h3>{item.price}</h3>
        </div>
      </div>
      </div>
      <hr />
      <div className="right-container" data-aos="fade-up">
        <div className="basic-info">
          <h3>Apply for this Project</h3>
          <hr />
          <form onSubmit={submitApply}>
            <div className="personal-details">
              <div className="first-name">
                <label htmlFor="firstName">FIRST NAME</label>
                <input
                  type="text"
                  id="firstName"
                  readOnly
                  name="firstName"
                  value={name}
                />
              </div>
              <div className="first-name">
                <label htmlFor="Email">EMAIL</label>
                <input
                  type="email"
                  id="Email"
                  value={email}
                  readOnly
                  name="Email"
                />
              </div>
            </div>
            <div className="title-duration">
              <div className="Project-title">
                <label htmlFor="mobile">PHONE NUMBER</label>
                {apply ? (
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    pattern="\d{10}"
                    maxLength="10"
                    required
                  />
                ) : (
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    className="Hide"
                    value={mobile}
                    readOnly
                  />
                )}
              </div>
              <div className="Project-title">
                <label htmlFor="PastProjectLink">PAST PROJECT LINK</label>
                {apply ? (
                  <input
                    type="text"
                    id="PastProjectLink"
                    name="PastProjectLink"
                    value={PastProjectLink}
                    onChange={(e) => setPastProjectLink(e.target.value)}
                    required
                  />
                ) : (
                  <input
                    type="text"
                    id="PastProjectLink"
                    name="PastProjectLink"
                    className="Hide"
                    value={PastProjectLink}
                    readOnly
                  />
                )}
              </div>
            </div>
            <div className="project-description">
              <label htmlFor="projectDescription">ABOUT DESCRIPTION</label>
              {apply ? (
                <textarea
                  className="text-area"
                  id="projectDescription"
                  name="projectDescription"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  required
                ></textarea>
              ) : (
                <textarea
                  className="text-area Hide"
                  id="projectDescription"
                  name="projectDescription"
                  value={projectDescription}
                  readOnly
                ></textarea>
              )}
            </div>
            <div className="skill">
              <label htmlFor="skillInvolved">GITHUB LINK</label>
              <input
                type="text"
                readOnly
                id="skillInvolved"
                value={github}
                name="skillInvolved"
              />
            </div>
            <div className="button">
              {apply ? (
                <button className="button1" type="submit">
                  Apply
                </button>
              ) :''}
            </div>
          </form>
          <div className="button">
                {apply?'':<button className="button2"  type="button" onClick={editApply}>
                  Edit
                </button>}
              </div>
        </div>
      </div>
    </div>
  );
}
