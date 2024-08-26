import React from 'react';
import ServiceCard from './ServiceCard';

function ServiceList({ services, onBookmark }) {
  return (
    <div className="service-list">
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          title={service.title}
          description={service.description}
          category={service.category}
          onBookmark={() => onBookmark(service.title)}
        />
      ))}
    </div>
  );
}

export default ServiceList;