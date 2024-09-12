import React, { useState, useEffect } from 'react';
import CategoryList from '../components/CategoryList';
import SearchBar from '../components/SearchBar';
import ServiceList from '../components/ServiceList';
import NewServiceForm from '../components/NewServiceForm';

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

  
  // Create New Service Form
  const handleServiceCreated = (newService) => {
    setServices([...services, newService]);
  };  

  const handleServiceUpdate = (id, title, description, category_id) => {
  const updatedService = { title, description, category_id };

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
      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === id ? { ...service, ...data } : service
        )
      );
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

// const handleServiceDelete = (id) => {
//   console.log("Deleting service with id:", id);  // Add this for debugging

//   fetch(`http://localhost:5002/api/services/${id}`, {
//     method: 'DELETE',
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Failed to delete service');
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log('Service deleted:', data);
//       // Update the state to remove the deleted service
//       setServices((prevServices) => prevServices.filter((service) => service.id !== id));
//     })
//     .catch((error) => {
//       console.error('Error deleting service:', error);
//     });
// };


  return (
    <div>
      <h1>Welcome to the Health Services Directory</h1>
      <SearchBar onSearch={(searchTerm) => console.log('Searching for:', searchTerm)} />
      <CategoryList categories={categories} onSelectCategory={handleCategorySelect} />
      <h2>Bookmarked Services</h2>
      <ServiceList services={filteredServices.filter((service) => bookmarkedServices.includes(service.title))} onBookmark={handleBookmark} />
      <h2>{selectedCategory === 'All' ? 'All Services' : `Services in ${selectedCategory}`}</h2>
      <ServiceList services={filteredServices} onBookmark={handleBookmark} />
      <NewServiceForm onServiceCreated={handleServiceCreated} />
    </div>
  );
}

export default HomePage;