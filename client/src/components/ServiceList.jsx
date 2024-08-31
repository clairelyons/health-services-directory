import React from 'react';
import ServiceCard from './ServiceCard';

function ServiceList({ services, onUpdate, onBookmark }) {
  return (
    <div className="service-list">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          id={service.id}
          title={service.title}
          description={service.description}
          category={service.category_name}
          onUpdate={onUpdate}
          onBookmark={onBookmark}  // Pass the onBookmark prop
        />
      ))}
    </div>
  );
}

export default ServiceList;