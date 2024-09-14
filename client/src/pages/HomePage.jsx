import React, { useState, useEffect } from 'react';
import CategoryList from '../components/CategoryList';
import SearchBar from '../components/SearchBar';
import ServiceList from '../components/ServiceList';
import NewServiceForm from '../components/NewServiceForm';

function HomePage() {
  const [services, setServices] = useState([]); // All services
  const [categories, setCategories] = useState([]);
  const [bookmarkedServices, setBookmarkedServices] = useState([]); // Track bookmarked services by ID
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Fetch categories
    fetch('http://localhost:5002/api/categories')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched categories:', data);
        setCategories(data);
      })
      .catch((error) => {
        console.error('Failed to fetch categories:', error);
      });
  }, []);

  // Handle bookmarking
  const handleBookmark = (serviceId) => {
    setBookmarkedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId) // Remove from bookmarks
        : [...prev, serviceId] // Add to bookmarks
    );
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Filter services based on selected category
  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter((service) => service.category_name === selectedCategory);

  // Filter services that are bookmarked
  const bookmarkedServiceList = services.filter((service) =>
    bookmarkedServices.includes(service.id)
  );

  // Handle newly created service
  const handleServiceCreated = (newService) => {
    setServices((prevServices) => [...prevServices, newService]);
  };

  return (
    <div>
      <h1>Welcome to the Health Services Directory</h1>
      <SearchBar onSearch={(searchTerm) => console.log('Searching for:', searchTerm)} />
      <CategoryList categories={categories} onSelectCategory={handleCategorySelect} />
      
      {/* <h2>Bookmarked Services</h2>
      <ServiceList services={bookmarkedServiceList} onBookmark={handleBookmark} /> */}

      <h2>{selectedCategory === 'All' ? 'All Services' : `Services in ${selectedCategory}`}</h2>
      <ServiceList services={filteredServices} onBookmark={handleBookmark} />

      <NewServiceForm onServiceCreated={handleServiceCreated} />
    </div>
  );
}

export default HomePage;