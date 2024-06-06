import React from 'react';
import { IoMdStopwatch } from "react-icons/io";
import Skill from './skill-involved';
export default function YourTaskpagecard({ item,handleDelete,index}) {
  const skilles = item.skillInvolved;

  if (!Array.isArray(skilles) || skilles.length === 0) {
    return null;
  }
  const onDeleteClick = () => {
    handleDelete(item.id); 
  };
  const animationType = index % 2 === 0 ? 'fade-right' : 'fade-left';
  return (
    <div className="your-project-card" data-aos={animationType}>
      <div className="title-time">
        <h3>{item.projectTitle}</h3>
        <div className="time">
          <IoMdStopwatch />
          {item.taskDuration}
        </div>
      </div>
      <div className="description">
        {item.projectDescription}
      </div>
      <div className="skill-delete">
      <div className="skills">
         {skilles.map((skill, index) => (
            <Skill key={index} item={skill} />
          ))}
      </div>
      <div className="delete">
        <button onClick={onDeleteClick}>Delete</button>
      </div>
      </div>
    </div>
  );
}

