import React, { useState } from 'react';
import '../styles/service-card.scss';

function ServiceCard({ id, title, description, category, county, contactMethod, onUpdate, onDelete, onBookmark, isActive, bookmarked }) {
  // Use local state to manage the bookmarked status
  const [localBookmarked, setLocalBookmarked] = useState(bookmarked);

  // Debug: Log the isActive value
  // console.log(`Service ${id} - isActive:`, isActive);

  // Combine both the bookmarked and inactive classes
  const cardClassName = `service-card ${localBookmarked ? 'bookmarked' : ''} ${isActive ? '' : 'inactive'}`;

  // Handle bookmarking with local state and callback
  const handleBookmarkClick = () => {
    setLocalBookmarked(!localBookmarked);
    onBookmark(id);  // Notify parent component about the bookmark action
  };

  // Handle updating the service title
  const handleUpdateClick = () => {
    const updatedTitle = prompt('Enter new title:', title);
    if (updatedTitle) {
      onUpdate(id, updatedTitle, description, category); // fixed update bug 
    }
  };

  return (
    <div className={cardClassName}>
      {/* Card Header for Title */}
      <div className="service-card-header">
        <h3>{title}</h3>
      </div>

      {/* Card Body for Description, Contact Method and County */}
      <div className="service-card-body">
        <p>{description}</p>
        {/* Contact Method and County Tags */}
        <div className="tags">
          {contactMethod && <span className="contact-method-tag">Contact: {contactMethod}</span>}
          {county && <span className="county-tag">Location: {county}</span>}
        </div>
      </div>

      {/* Card Footer */}
      <div className="service-card-footer">
        {/* Category Tag aligned to the left */}
        {category && <span className="category-tag">{category}</span>}
        
        {/* Buttons aligned to the right in button group */}
        <div className="button-group">
          <button onClick={handleUpdateClick}>Edit Title</button>
          <button className="bookmark-btn" onClick={handleBookmarkClick}>
            {localBookmarked ? 'Unbookmark' : 'Bookmark'}
          </button>
          <button className="deactivate-btn" onClick={() => onDelete(id)}>Deactivate</button>
        </div>
      </div>
    </div>

  
  );
}

export default ServiceCard;