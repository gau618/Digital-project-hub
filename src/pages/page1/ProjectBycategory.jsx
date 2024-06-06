import React from 'react';
import "./index.scss";
import { Initialdata } from '../../Data/Data';
import Categarycards from './categarycards';

export default function ProjectBycategory() {
  return (
    <div className="Project-category">
      <div className="category-heading">
        <div>
          <h2>Explore Projects By Category</h2>
          <p>Browse top class project by browsing our category which will be easy for you</p>
        </div>
        <button>All Category</button>
      </div>
      <div className="project-containor">
        {Initialdata.map((item, index) => (
          <Categarycards key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
