import React from 'react';

function ServiceCard({ title, description, category, onBookmark }) {
  return (
    <div className="service-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="category">{category}</span>
      <button onClick={onBookmark}>Bookmark</button>
    </div>
  );
}

export default ServiceCard;