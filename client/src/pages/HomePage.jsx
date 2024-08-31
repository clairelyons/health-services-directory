import React, { useState, useEffect } from 'react';
import CategoryList from '../components/CategoryList';
import SearchBar from '../components/SearchBar';
import ServiceList from '../components/ServiceList';

function HomePage() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [bookmarkedServices, setBookmarkedServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
  // Fetch services
  fetch('http://localhost:5002/api/services')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Fetched services:', data);  // Debugging output
      setServices(data);
    })
    .catch((error) => {
      console.error('Failed to fetch services:', error);
    });

  // Fetch categories
  fetch('http://localhost:5002/api/categories')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Fetched categories:', data);  // Debugging output
      setCategories(data);
    })
    .catch((error) => {
      console.error('Failed to fetch categories:', error);
    });
}, []);

  const handleBookmark = (serviceTitle) => {
    setBookmarkedServices((prev) => {
      if (prev.includes(serviceTitle)) {
        return prev.filter((title) => title !== serviceTitle);
      } else {
        return [...prev, serviceTitle];
      }
    });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter((service) => service.category_name === selectedCategory);

  return (
    <div>
      <h1>Welcome to the Health Services Directory</h1>
      <SearchBar onSearch={(searchTerm) => console.log('Searching for:', searchTerm)} />
      <CategoryList categories={categories} onSelectCategory={handleCategorySelect} />
      <h2>Bookmarked Services</h2>
      <ServiceList services={filteredServices.filter((service) => bookmarkedServices.includes(service.title))} onBookmark={handleBookmark} />
      <h2>{selectedCategory === 'All' ? 'All Services' : `Services in ${selectedCategory}`}</h2>
      <ServiceList services={filteredServices} onBookmark={handleBookmark} />
    </div>
  );
}

export default HomePage;