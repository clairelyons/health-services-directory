import React, { useState } from 'react';

function ServiceCard({ title, description, category, onBookmark }) {
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    setBookmarked(!bookmarked);
    onBookmark(title);
  };

  return (
    <div className={`service-card ${bookmarked ? 'bookmarked' : ''}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="category">{category}</span>
      <button onClick={handleBookmarkClick}>
        {bookmarked ? 'Unbookmark' : 'Bookmark'}
      </button>
    </div>
  );
}

export default ServiceCard;