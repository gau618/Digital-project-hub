import React from "react";
export default function Categarycards({ item, index }) {
  const animationType = index % 2 === 0 ? 'fade-right' : 'fade-left';

  return (
    <div className="single-card-container" data-aos={animationType}>
      <img src={item.image} alt={item.title} />
      <div>
        <h4>{item.title}</h4>
        <p>{item.totalproject}</p>
      </div>
    </div>
  );
}
