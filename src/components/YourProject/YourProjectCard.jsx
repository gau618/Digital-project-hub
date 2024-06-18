import React from 'react';
import { useNavigate } from "react-router-dom";
import { IoMdStopwatch } from "react-icons/io";
import { GrProjects } from "react-icons/gr";

export default function YourProjectCard({ item }) {
  const navigate = useNavigate();
  console.log(item);

  return (
    <>
     
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
            <button onClick={() => navigate("/")}>Home</button>
            <h3>{item.price}</h3>
          </div>
        </div>
   
    </>
  );
}
