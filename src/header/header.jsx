import React, { useState, useEffect } from 'react';
import { IoIosSearch, IoIosMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './header.scss';

export default function Header() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects-section');
    projectsSection.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContacts = () => {
    const contactSection = document.getElementById('footer-section');
    contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
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
            <Link to="#" onClick={scrollToProjects}>PROJECTS</Link>
            <Link to="/ADDTASK">ADD TASK</Link>
            <Link to="/YOURTASKS">YOUR TASKS</Link>
            <Link to="#" onClick={scrollToContacts}>CONTACT</Link>
          </div>
          <div className="Searchbox">
            <input type="text" />
            <IoIosSearch className='searchicon' />
          </div>
        </>
      ) : (
        <>
          {isSidebarOpen ? (
            <>
              
              <div className="sidebar">
                <IoCloseSharp className='closeIcon' onClick={closeSidebar} />
                <div className="headeritem">
                  <Link to="/" onClick={toggleSidebar}>HOME</Link>
                  <Link to="#" onClick={scrollToProjects}>PROJECTS</Link>
                  <Link to="/ADDTASK" onClick={toggleSidebar}>ADD TASK</Link>
                  <Link to="/YOURTASKS" onClick={toggleSidebar}>YOUR TASKS</Link>
                  <Link to="#" onClick={scrollToContacts}>CONTACT</Link>
                </div>
              </div>
            </>
          ) : (
            <IoIosMenu className='menuIcon' onClick={toggleSidebar} />
          )}
        </>
      )}
    </div>
  );
}
