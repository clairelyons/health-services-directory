import React from 'react';
import ServiceCard from './ServiceCard';

function ServiceList({ services, bookmarkedServices, onBookmark, onUpdate, onDelete }) {
  // Ensure bookmarkedServices is initialized as an empty array if undefined
  const safeBookmarkedServices = bookmarkedServices || [];

  // Function to handle bookmarking
  const handleBookmarkClick = (id) => {
    onBookmark(id);  // Call the parent function for bookmarking
  };

    // Handle update
    const handleServiceUpdate = (id, updatedService) => {
      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === id ? { ...service, ...updatedService } : service
        )
      );
    };

  // Function to handle service updates
  const handleUpdateClick = (id, updatedTitle, description, category_id) => {
    const defaultCategoryId = category_id ? parseInt(category_id, 10) : 1;
    const updatedService = { title: updatedTitle, description, category_id: defaultCategoryId };
    
      fetch(`http://localhost:5002/api/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedService),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update service'); // Ensure error is caught
          }
          return response.json();
        })
        .then((data) => {
          onUpdate(id, data); // Update the parent component state
        })
        .catch((error) => {
          console.error('Error updating service:', error);
        });
    };


  // Function to mark service as inactive (soft delete)
  const handleDeleteClick = (id) => {
    fetch(`http://localhost:5002/api/services/${id}/inactive`, {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then(() => {
        onDelete(id);  // Notify parent about the deletion
      })
      .catch((error) => {
        console.error('Error setting service as inactive:', error);
      });
  };

  return (
    <div className="service-list">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          id={service.id}
          title={service.title}
          description={service.description}
          category={service.category_name}
          contactMethod={service.contact_method}
          county={service.county}
          isActive={service.is_active}
          bookmarked={safeBookmarkedServices.includes(service.id)}  // Use the safeBookmarkedServices array
          onUpdate={handleUpdateClick}
          onBookmark={handleBookmarkClick}
          onDelete={handleDeleteClick}
        />
      ))}
    </div>
  );
}

export default ServiceList;