import React, { useState } from 'react';
import '../styles/service-card.scss';

function ServiceCard({ id, title, description, category, contactMethod, onUpdate, onDelete, onBookmark, isActive, bookmarked }) {
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
    // <div className={cardClassName}>
    //   <div className="service-card-header">
    //   <h3>{title}</h3>
    //   <p>{description}</p>
    //   {category && <span className="category-tag">{category}</span>}
    //   </div>
      
    //   {/* Display the contact method if it exists */}
    //   {contactMethod && (
    //     <div classname="service-card-footer">
    //       <span className="contact-method-tag">Contact: {contactMethod}</span>
    //     </div>
    //   )}

    //   {/* Log the value of isActive */}
    //   {/* {console.log(`Service ID: ${id}, isActive: ${isActive}`)} */}
    //   {isActive ? (
    //     <>
    //       <button onClick={handleUpdateClick}>Edit Title</button>
    //       <button onClick={handleBookmarkClick}>
    //         {localBookmarked ? 'Unbookmark' : 'Bookmark'}
    //       </button>
    //     </>
    //   ) : (
    //     <p>This service is inactive.</p>
    //   )}

    //   {/* Delete (soft delete, marking as inactive) */}
    //   <button onClick={() => onDelete(id)}>Deactivate</button>

    // </div>

    // <div className={cardClassName}>
    //   {/* Card Header for Title */}
    //   <div className="service-card-header">
    //     <h3>{title}</h3>
    //   </div>

    //   {/* Card Body for Description and Category */}
    //   <div className="service-card-body">
    //     <p>{description}</p>
    //     {category && <span className="category-tag">{category}</span>}
    //   </div>

    //   {/* Card Footer for Buttons and Contact Method */}
    //   <div className="service-card-footer">
    //     {/* Buttons aligned to the right */}
    //     <div className="footer-actions">
    //       {isActive ? (
    //         <>
    //           <button onClick={handleUpdateClick}>Edit Title</button>
    //           <button onClick={handleBookmarkClick}>
    //             {localBookmarked ? 'Unbookmark' : 'Bookmark'}
    //           </button>
    //           <button onClick={() => onDelete(id)}>Deactivate</button>
    //         </>
    //       ) : (
    //         <p>This service is inactive.</p>
    //       )}
    //     </div>

    //     {/* Contact Method aligned to the left */}
    //     {contactMethod && (
    //       <div className="footer-contact">
    //         <span className="contact-method-tag">Contact: {contactMethod}</span>
    //       </div>
    //     )}
    //   </div>
    // </div>




  //     <div className="service-card">
  //   <h3>{title}</h3> {/* Title in the header */}
    
  //   <div className="card-body">
  //     <p>{description}</p> {/* Description */}
  //     {category && <span className="category-tag">{category}</span>} {/* Category Tag */}
  //   </div>
    

  //   <div className="card-footer">
  //         {/* Contact Method */}
  //   {contactMethod && <span className="contact-method-tag">Contact: {contactMethod}</span>}
  //     <button onClick={handleUpdateClick}>Edit Title</button>
  //     <button className="bookmark-btn" onClick={handleBookmarkClick}>
  //       {localBookmarked ? 'Unbookmark' : 'Bookmark'}
  //     </button>
  //     <button className="deactivate-btn" onClick={() => onDelete(id)}>Deactivate</button>
  //   </div>
  // </div>

    //   <div className={cardClassName}>
    //   {/* Card Header for Title */}
    //   <div className="service-card-header">
    //     <h3>{title}</h3>
    //   </div>

    //   {/* Card Body for Description */}
    //   <div className="service-card-body">
    //     <p>{description}</p>
    //   </div>

    //   {/* Card Footer */}
    //   <div className="service-card-footer">
    //     {/* Category Tag aligned to the left */}
    //     {category && <span className="category-tag">{category}</span>}
        
    //     <div className="button-group">
    //       {/* Buttons aligned to the right */}
    //       <button onClick={handleUpdateClick}>Edit Title</button>
    //       <button className="bookmark-btn" onClick={handleBookmarkClick}>
    //         {localBookmarked ? 'Unbookmark' : 'Bookmark'}
    //       </button>
    //       <button className="deactivate-btn" onClick={() => onDelete(id)}>Deactivate</button>
    //     </div>
    //   </div>

    //   {/* Contact Method aligned to bottom right */}
    //   {contactMethod && <span className="contact-method-tag">Contact: {contactMethod}</span>}
    // </div>

    <div className={cardClassName}>
      {/* Card Header for Title */}
      <div className="service-card-header">
        <h3>{title}</h3>
      </div>

      {/* Card Body for Description, Contact Method and County */}
      <div className="service-card-body">
        <p>{description}</p>
        {/* Contact Method aligned to bottom right */}
        {contactMethod && <span className="contact-method-tag">Contact: {contactMethod}</span>}
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