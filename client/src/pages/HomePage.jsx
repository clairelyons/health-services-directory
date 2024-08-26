import React, { useState } from 'react';
import CategoryList from '../components/CategoryList';
import SearchBar from '../components/SearchBar';
import ServiceList from '../components/ServiceList';

function HomePage() {
  const [services, setServices] = useState([
    {
      title: 'General Health Clinic',
      description: 'A clinic offering general health services.',
      category: 'General Health',
    },
    {
      title: 'Mental Health Support',
      description: 'Support services for mental health.',
      category: 'Mental Health',
    },
    {
      title: 'Dental Care Center',
      description: 'Dental care and hygiene services.',
      category: 'Dental Care',
    },
    // Add more services as needed
  ]);

  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
  };

  const handleBookmark = (serviceTitle) => {
    console.log('Bookmarked:', serviceTitle);
  };

  return (
    <div>
      <h1>Welcome to the Health Services Directory</h1>
      <SearchBar onSearch={handleSearch} />
      <CategoryList />
      <ServiceList services={services} onBookmark={handleBookmark} />
    </div>
  );
}

export default HomePage;