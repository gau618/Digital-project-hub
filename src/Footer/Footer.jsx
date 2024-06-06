import React from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";
import './index.scss';
export default function Footer() {
  return (
    <div className="footer-container" id='footer-section' data-aos="fade-up">
        <div className="footer">
        <div className="contact-info">
          <h2>Contact info</h2>
          <div className="items">
           <FaPhoneAlt/>
           <p>+910-XXZ-YXY-99</p>
          </div>
          <div className="items">
           <FaWhatsapp/>
           <p>+910-XXZ-YXY-909</p>
          </div>
          <div className="items">
           <CiMail/>
           <p>22b90087@.IITk.edu</p>
          </div>
          <div className="items">
           <CiLocationOn/>
           <p>Gift city Ganadinager</p>
          </div>
        </div>
        <div className="Resources">
          <h2>Resources</h2>
          <p>Free Course</p>
          <p>Blogs</p>
          <p>Project Ideas</p>
          <p>Videos</p>
        </div>
        <div className="links">
            <h2>Useful links</h2>
         <p>Became a Mentor</p>
         <p>Our Membar</p>
         <p>Online courses</p>
         <p>Contact us</p>
        </div>
        <div className="social-media">
            <h2>Social media</h2>
            <div className="items">
            <FaLinkedin/>
            <p>Linkedin</p>
            </div>
            <div className="items">
           <FaTwitter/>
            <p>Twitter</p>
            </div>
            <div className="items">
            <FaYoutube/>
            <p>Youtube</p>
            </div>
            <div className="items">
            <FaDiscord/>
            <p>Discord</p>
            </div>
        </div>
        </div>
        <div className="copyrights">
            <p>Copyright &copy; 2024 -Gaurav kannaujiya- ALL Rights Reserved.</p>
        </div>
    </div>
  )
}
