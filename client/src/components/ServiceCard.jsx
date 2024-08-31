import React, { useState } from 'react';

function ServiceCard({ id, title, description, category, onBookmark, onUpdate }) {
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    setBookmarked(!bookmarked);
    onBookmark(title);
  };

  const handleUpdateClick = () => {
    const updatedTitle = prompt('Enter new title:', title);
    if (updatedTitle) {
      onUpdate(id, updatedTitle, description, category);
    }
  };

  return (
    <div className={`service-card ${bookmarked ? 'bookmarked' : ''}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="category">{category}</span>
      <button onClick={handleBookmarkClick}>
        {bookmarked ? 'Unbookmark' : 'Bookmark'}
      </button>
      <button onClick={handleUpdateClick}>Edit</button>
    </div>
  );
}

export default ServiceCard;