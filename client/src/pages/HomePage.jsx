import React from 'react';
import CategoryList from '../components/CategoryList';
import SearchBar from '../components/SearchBar';

function HomePage() {
  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
    // You can add search functionality here
  };

  return (
    <div>
      <h1>Welcome to the Health Services Directory</h1>
      <SearchBar onSearch={handleSearch} />
      <CategoryList />
      {/* Additional content like featured services goes here */}
    </div>
  );
}

export default HomePage;