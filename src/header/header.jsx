import React, { useState, useEffect } from "react";
import { IoIosSearch, IoIosMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import profile from '../assets/profile.jpg';
import "./header.scss";
import { auth,storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";  // Import Firebase storage utilities
import { useLocation } from "react-router-dom";

export default function Header() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  }, [auth.currentUser]); // Dependency array should include auth.currentUser

  const goToAuth = () => {
    navigate("/auth");
  };

  const SignOut = () => {
    logout();
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects-section");
    projectsSection.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContacts = () => {
    const contactSection = document.getElementById("footer-section");
    contactSection.scrollIntoView({ behavior: "smooth" });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const NavigateToProfile = () => {
    if (auth.currentUser) {
      navigate(`/UserProfile/${auth.currentUser.uid}`);
    }
  };

  return (
    <div className="headerContainer">
      <div className="headername">
        <h3>Project Point</h3>
      </div>
      {screenWidth > 900 ? (
        <>
          <div className="headeritem">
            <Link to="/">HOME</Link>
            <Link to="#" onClick={scrollToProjects}>
              PROJECTS
            </Link>
            <Link to="/ADDTASK">ADD TASK</Link>
            <Link to="/YOURTASKS">YOUR TASKS</Link>
            <Link to="#" onClick={scrollToContacts}>
              CONTACT </Link>
          </div>
          <div className="Searchbox">
            {auth.currentUser && location.pathname === `/UserProfile/${auth.currentUser.uid}` ? (
              <button className="button2" onClick={SignOut}>
                LogOut
              </button>
            ) : user ? (
              <img src={photoURL || profile} alt="img" onClick={NavigateToProfile} />
            ) : (
              <button className="button1" onClick={goToAuth}>
                Credentials
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          {isSidebarOpen ? (
            <>
              <div className="sidebar">
                <IoCloseSharp className="closeIcon" onClick={closeSidebar} />
                <div className="Searchbox">
                {auth.currentUser && location.pathname === `/UserProfile/${auth.currentUser.uid}` ? (
              <button className="button2" onClick={SignOut}>
                LogOut
              </button>
            ) : user ? (
              <img src={photoURL || profile} alt="img" onClick={NavigateToProfile} />
            ) : (
              <button className="button1" onClick={goToAuth}>
                Credentials
              </button>
            )}
                </div>
                <div className="headeritem">
                  <Link to="/" onClick={toggleSidebar}>
                    HOME
                  </Link>
                  <Link to="#" onClick={scrollToProjects}>
                    PROJECTS
                  </Link>
                  <Link to="/ADDTASK" onClick={toggleSidebar}>
                    ADD TASK
                  </Link>
                  <Link to="/YOURTASKS" onClick={toggleSidebar}>
                    YOUR TASKS
                  </Link>
                  <Link to="#" onClick={scrollToContacts}>
                    CONTACT
                  </Link>
                </div>
               
              </div>
            </>
          ) : (
            <IoIosMenu className="menuIcon" onClick={toggleSidebar} />
          )}
        </>
      )}
    </div>
  );
}
