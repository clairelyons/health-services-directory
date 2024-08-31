import React, { useState, useEffect } from 'react';
import CategoryList from '../components/CategoryList';
import SearchBar from '../components/SearchBar';
import ServiceList from '../components/ServiceList';

function HomePage() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/services')
      .then((response) => response.json())
      .then((data) => setServices(data));

    fetch('/api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

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
      <CategoryList categories={categories} />
      <ServiceList services={services} onBookmark={handleBookmark} />
    </div>
  );
}

export default HomePage;