// 

// import React, { useState } from 'react';

// function ServiceCard({ id, title, description, category, onUpdate, onDelete, onBookmark, isActive, bookmarked }) {
//   // Use local state to manage the bookmarked status
//   const [localBookmarked, setLocalBookmarked] = useState(bookmarked);

//   // Combine both the bookmarked and inactive classes
//   const cardClassName = `service-card ${localBookmarked ? 'bookmarked' : ''} ${isActive ? '' : 'inactive'}`;

//   // Handle bookmarking with local state and callback
//   const handleBookmarkClick = () => {
//     setLocalBookmarked(!localBookmarked);
//     onBookmark(id);  // Notify parent component about the bookmark action
//   };

//   // Handle updating the service title
//   const handleUpdateClick = () => {
//     const updatedTitle = prompt('Enter new title:', title);
//     if (updatedTitle) {
//       onUpdate(id, updatedTitle, description, category);
//     }
//   };

//   return (
//     <div className={cardClassName}>
//       <h3>{title}</h3>
//       <p>{description}</p>
//       {category && <span className="category-tag">{category}</span>}
      
//       {isActive && (
//         <>
//           <button onClick={handleUpdateClick}>Edit Title</button>
//           <button onClick={handleBookmarkClick}>
//             {localBookmarked ? 'Unbookmark' : 'Bookmark'}
//           </button>
//         </>
//       )}
      
//       {/* Delete (soft delete, marking as inactive) */}
//       <button onClick={() => onDelete(id)}>Delete</button>
//     </div>
//   );
// }

// export default ServiceCard;

import React, { useState } from 'react';

function ServiceCard({ id, title, description, category, onUpdate, onDelete, onBookmark, isActive, bookmarked }) {
  // Use local state to manage the bookmarked status
  const [localBookmarked, setLocalBookmarked] = useState(bookmarked);

  // Debug: Log the isActive value
  console.log(`Service ${id} - isActive:`, isActive);

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
      onUpdate(id, updatedTitle, description, category);
    }
  };

  return (
    <div className={cardClassName}>
      <h3>{title}</h3>
      <p>{description}</p>
      {category && <span className="category-tag">{category}</span>}

      {/* Log the value of isActive */}
      {console.log(`Service ID: ${id}, isActive: ${isActive}`)}

      {isActive ? (
        <>
          <button onClick={handleUpdateClick}>Edit Title</button>
          <button onClick={handleBookmarkClick}>
            {localBookmarked ? 'Unbookmark' : 'Bookmark'}
          </button>
        </>
      ) : (
        <p>This service is inactive.</p>
      )}

      {/* Delete (soft delete, marking as inactive) */}
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}

export default ServiceCard;