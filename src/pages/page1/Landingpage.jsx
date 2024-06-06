import React, { useState, useEffect } from 'react';
import landingpageimage from '../../assets/image2.png';
import landingpageimage1 from '../../assets/image1.webp';
import landingpageimage2 from '../../assets/image3.jpg';
import ProjectBycategory from './ProjectBycategory';
import Projectbox from './projectbox';
import { FaRegLightbulb } from "react-icons/fa";
import Typed from 'typed.js';
import "./index.scss";

export default function Landingpage() {
  const [currentImage, setCurrentImage] = useState(landingpageimage);
  const [fade, setFade] = useState(false);
  useEffect(() => {
    const images = [landingpageimage, landingpageimage1, landingpageimage2];
    let index = 0;

    const interval = setInterval(() => {
      setFade(true);

      setTimeout(() => {
        index = (index + 1) % images.length;
        setCurrentImage(images[index]);
        setFade(false);
      }, 1000);

    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const typed = new Typed(".text", {
      strings: ["Project Point", "Us"],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <div className="homecontainer">
        <div className="left-container" data-aos="fade-right">
          <div className="left-container-itme">
            <div className="bulb-icon">
              <FaRegLightbulb />
              <p>Best way to achieve more</p>
            </div>
            <p className="heading">
              Complete Tasks, <span>Earn </span>points, and <span>Grow</span> with <br /><span className='text'></span>
            </p>
            <p className="whiteline">
              Get recognized for your efforts on Project Point and tackle project challenges on any device.
            </p>
            <div className="left-buttons">
              <button className="button1">Get Started</button>
              <button className="button2">Learn more</button>
            </div>
          </div>
        </div>
        <div className="right-container" data-aos="fade-left">
          <img src={currentImage} alt="Landing Page" className={fade ? 'fade-out' : ''} />
        </div>
      </div>
      <div className="bottom-container" data-aos="fade-up">
        <div className="item">
          <h2>10 +</h2>
          <p>YEARS OF </p>
          <p>EXPERIENCE</p>
        </div>
        <div className="item">
          <h2>190 +</h2>
          <p>ONLINE</p>
          <p>PROJECTS</p>
        </div>
        <div className="item">
          <h2>100K +</h2>
          <p>HAPPY</p>
          <p>STUDENTS</p>
        </div>
        <div className="item">
          <h2>50 +</h2>
          <p>EXPERT</p>
          <p>MENTORS</p>
        </div>
      </div>
      <ProjectBycategory />
      <Projectbox />
    </>
  );
}
