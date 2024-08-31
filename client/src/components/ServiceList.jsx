import React from 'react';
import ServiceCard from './ServiceCard';

function ServiceList({ services, onBookmark }) {
  if (services.length === 0) {
    return <p>No services available.</p>;
  }

  return (
    <div className="service-list">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          title={service.title}
          description={service.description}
          category={service.category_name}
          onBookmark={onBookmark}
        />
      ))}
    </div>
  );
}

export default ServiceList;