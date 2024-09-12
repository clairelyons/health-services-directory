import React from 'react';
import ServiceCard from './ServiceCard';

// function ServiceList({ services, onUpdate, onBookmark, onDelete }) {
//   return (
//     <div className="service-list">
//       {services.map((service) => (
//         <ServiceCard
//           key={service.id}
//           id={service.id}
//           title={service.title}
//           description={service.description}
//           category={service.category_name}
//           onUpdate={onUpdate}
//           onBookmark={onBookmark}  // Pass the onBookmark prop
//         />
//       ))}
//     </div>
//   );
//}


function ServiceList({ services, setServices, onBookmark }) {

    // Function to handle service updates
  const handleUpdateClick = (id, updatedTitle, description, category_id) => {
    const updatedService = { title: updatedTitle, description, category_id};

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
          isActive={service.is_active}  // Pass isActive prop
          bookmarked={service.bookmarked}  // Pass bookmarked prop
          onUpdate={handleUpdateClick}
          onBookmark={onBookmark}
          onDelete={handleDeleteClick}
        />
      ))}
    </div>
  );
}

export default ServiceList;