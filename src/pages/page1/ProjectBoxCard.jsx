import React, { useState, useEffect } from 'react';
import { IoMdStopwatch } from "react-icons/io";
import { GrProjects } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
export default function ProjectBoxCard({ item, index, Id }) { 
  const {user}=useAuth();
  const animationType = index % 2 === 0 ? 'fade-right' : 'fade-left';
  const Navigate=useNavigate();
  const NavigateToApply=()=>{
    if(user){
      Navigate(`/Project/${Id}`);
    }else{
      alert('Please SignIN')
    }
    
  }
  return (
    <div className="single-card" data-aos={animationType} onClick={NavigateToApply}>
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
        <p>
          {item.description}
        </p>
      </div>
      <div className="project-price">
        <button>More Details</button>
        <h3>{item.price}</h3>
      </div>
    </div>
  );
}
