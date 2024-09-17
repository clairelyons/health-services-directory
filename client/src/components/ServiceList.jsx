import React, { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';

function ServiceList() {
  const [services, setServices] = useState([]);
  const [bookmarkedServices, setBookmarkedServices] = useState([]); // New state for bookmarked services

  useEffect(() => {
    // Fetch services when component mounts
    fetch('http://localhost:5002/api/services')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = response.json()
        console.log(data)
        return data;
      })
      .then((data) => {
        setServices(data);
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
      });
  }, []);

  // Function to handle bookmarking
  const handleBookmarkClick = (id) => {
    setBookmarkedServices((prevBookmarkedServices) => {
      if (prevBookmarkedServices.includes(id)) {
        // Remove from bookmarks if already bookmarked
        return prevBookmarkedServices.filter((serviceId) => serviceId !== id);
      } else {
        // Add to bookmarks if not already bookmarked
        return [...prevBookmarkedServices, id];
      }
    });
  };

  // Function to handle service updates
  const handleUpdateClick = (id, updatedTitle, description, category_id) => {

    // Check if category_id is null or undefined, set a default value
  const defaultCategoryId = category_id ? parseInt(category_id, 10) : 1;  // Set your default category_id here

    const updatedService = { 
      title: updatedTitle, 
      description, 
      category_id: defaultCategoryId  // Ensure category_id is set to a valid value to fix bug
    };


    // Moved update and logic from HomePage here due to error
    fetch(`http://localhost:5002/api/services/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedService),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update service');
        }
        return response.json();
      })
      .then((data) => {
        // Update the services state to reflect the updated service
        setServices((prevServices) =>
          prevServices.map((service) =>
            service.id === id ? { ...service, ...data } : service
          )
        );
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
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to set service as inactive');
        }
        return response.json();
      })
      .then(() => {
        // Update the state to set the service as inactive
        setServices((prevServices) =>
          prevServices.map((service) =>
            service.id === id ? { ...service, is_active: false } : service
          )
        );
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
          county={service.county}  // Pass the county prop
          isActive={service.is_active}
          bookmarked={bookmarkedServices.includes(service.id)} // Pass the bookmark state
          onUpdate={handleUpdateClick}
          onBookmark={handleBookmarkClick}
          onDelete={handleDeleteClick}
        />
      ))}
    </div>
  );
}

export default ServiceList;