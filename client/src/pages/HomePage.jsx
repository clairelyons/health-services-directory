// import React, { useState, useEffect } from 'react';
// import CategoryList from '../components/CategoryList';
// import SearchBar from '../components/SearchBar';
// import ServiceList from '../components/ServiceList';
// import NewServiceForm from '../components/NewServiceForm';

// function HomePage() {
//   const [services, setServices] = useState([]); // All services
//   const [categories, setCategories] = useState([]);
//   const [bookmarkedServices, setBookmarkedServices] = useState([]); // Track bookmarked services by ID
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   useEffect(() => {
//     // Fetch categories
//     fetch('http://localhost:5002/api/categories')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log('Fetched categories:', data);
//         setCategories(data);
//       })
//       .catch((error) => {
//         console.error('Failed to fetch categories:', error);
//       });
//   }, []);

//   // Handle bookmarking
//   const handleBookmark = (serviceId) => {
//     setBookmarkedServices((prev) =>
//       prev.includes(serviceId)
//         ? prev.filter((id) => id !== serviceId) // Remove from bookmarks
//         : [...prev, serviceId] // Add to bookmarks
//     );
//   };

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//   };

//   // Filter services based on selected category
//   const filteredServices = selectedCategory === 'All'
//     ? services
//     : services.filter((service) => service.category_name === selectedCategory);

//   // Filter services that are bookmarked
//   const bookmarkedServiceList = services.filter((service) =>
//     bookmarkedServices.includes(service.id)
//   );

//   // Handle newly created service
//   const handleServiceCreated = (newService) => {
//     setServices((prevServices) => [...prevServices, newService]);
//   };

//   return (
//     <div>
//       <h1>Welcome to the Health Services Directory</h1>
//       <SearchBar onSearch={(searchTerm) => console.log('Searching for:', searchTerm)} />
//       <CategoryList categories={categories} onSelectCategory={handleCategorySelect} />
      
//       <h2>Bookmarked Services</h2>
//       <ServiceList services={bookmarkedServiceList} onBookmark={handleBookmark} />

//       <h2>{selectedCategory === 'All' ? 'All Services' : `Services in ${selectedCategory}`}</h2>
//       <ServiceList services={filteredServices} onBookmark={handleBookmark} />

//       <NewServiceForm onServiceCreated={handleServiceCreated} />
//     </div>
//   );
// }

// export default HomePage;

// import React, { useState, useEffect } from 'react';
// import CategoryList from '../components/CategoryList';
// import SearchBar from '../components/SearchBar';
// import ServiceList from '../components/ServiceList';
// import NewServiceForm from '../components/NewServiceForm';

// function HomePage() {
//   const [services, setServices] = useState([]); // All services
//   const [categories, setCategories] = useState([]);
//   const [bookmarkedServices, setBookmarkedServices] = useState([]); // Track bookmarked services by ID
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [searchTerm, setSearchTerm] = useState(''); // State for search term

//   // Fetch services and categories on component mount
//   useEffect(() => {
//     // Fetch services
//     fetch('http://localhost:5002/api/services')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setServices(data);
//       })
//       .catch((error) => {
//         console.error('Failed to fetch services:', error);
//       });

//     // Fetch categories
//     fetch('http://localhost:5002/api/categories')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setCategories(data);
//       })
//       .catch((error) => {
//         console.error('Failed to fetch categories:', error);
//       });
//   }, []);

//   // Handle bookmarking
//   const handleBookmark = (serviceId) => {
//     setBookmarkedServices((prev) =>
//       prev.includes(serviceId)
//         ? prev.filter((id) => id !== serviceId) // Remove from bookmarks
//         : [...prev, serviceId] // Add to bookmarks
//     );
//   };

//   const handleCategorySelect = (categoryId) => {
//     setSelectedCategory(categoryId);  // Set category by ID instead of name
//   };

//   const handleSearch = (term) => {
//     setSearchTerm(term);
//   };

//   // Filter services based on selected category and search term
//   const filteredServices = services.filter((service) => {
//     const matchesCategory = selectedCategory === 'All' || service.category_id === selectedCategory; // Filter by category ID
//     const matchesSearch = searchTerm === '' || service.title.toLowerCase().includes(searchTerm.toLowerCase()) || service.description.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   // Handle newly created service
//   const handleServiceCreated = (newService) => {
//     setServices((prevServices) => [...prevServices, newService]);
//   };

//   return (
//     <div>
//       <h1>Welcome to the Health Services Directory</h1>

//       {/* Pass handleSearch to the SearchBar component */}
//       <SearchBar onSearch={handleSearch} />

//       <CategoryList categories={categories} onSelectCategory={handleCategorySelect} />
      
//       <h2>{selectedCategory === 'All' ? 'All Services' : `Services in Selected Category`}</h2>

//       {/* Render the filtered services */}
//       <ServiceList services={filteredServices} onBookmark={handleBookmark} />

//       <NewServiceForm onServiceCreated={handleServiceCreated} />
//     </div>
//   );
// }

// export default HomePage;

import React, { useState, useEffect } from 'react';
import CategoryList from '../components/CategoryList';
import SearchBar from '../components/SearchBar';
import ServiceList from '../components/ServiceList';
import NewServiceForm from '../components/NewServiceForm';

function HomePage() {
  const [services, setServices] = useState([]); // All services
  const [categories, setCategories] = useState([]);
  const [bookmarkedServices, setBookmarkedServices] = useState([]); // Track bookmarked services by ID
  const [selectedCategory, setSelectedCategory] = useState('All'); // Selected category
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  // Fetch services and categories on component mount
  useEffect(() => {
    // Fetch services
    fetch('http://localhost:5002/api/services')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched services:', data);
        setServices(data);
      })
      .catch((error) => {
        console.error('Failed to fetch services:', error);
      });

    // Fetch categories
    fetch('http://localhost:5002/api/categories')
      .then((response) => response.json())
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

  // Handle category selection by ID
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchTerm('');  // Clear search term when a new category is selected
  };

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // // Filter services based on selected category and search term
  // const filteredServices = services.filter((service) => {
  //   const matchesCategory = selectedCategory === 'All' || 
  //   service.category_id === selectedCategory; // Match by category ID
  //   const matchesSearch =
  //     searchTerm === '' ||
  //     service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     service.description.toLowerCase().includes(searchTerm.toLowerCase());

  //   return matchesCategory && matchesSearch;
  // });

  // Filter services based on selected category and search term
  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'Bookmarks' && bookmarkedServices.includes(service.id)) || // Filter by bookmarks
      service.category_id === selectedCategory;
    const matchesSearch =
      searchTerm === '' ||
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Handle newly created service
  const handleServiceCreated = (newService) => {
    setServices((prevServices) => [...prevServices, newService]);
  };

  return (
    <div>
      <h1>Welcome to the Health Services Directory</h1>
      <SearchBar onSearch={handleSearch} />
      <CategoryList categories={categories} onSelectCategory={handleCategorySelect} />

      <h2>{selectedCategory === 'All' ? 'All Services' : selectedCategory === 'Bookmarks' ? 'Bookmarked Services' : `Services in Selected Category`}</h2>
      <ServiceList services={filteredServices} onBookmark={handleBookmark} />

      <NewServiceForm onServiceCreated={handleServiceCreated} />
    </div>
  );
}

export default HomePage;