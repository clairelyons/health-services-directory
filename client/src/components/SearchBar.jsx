import React, { useState } from 'react';
import './searchbar.scss';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);  // Trigger search with the current search term
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');  // Clear the search term input
    onSearch('');  // Trigger a search with an empty string to reset results
  };

    // Function to handle Enter key press
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSearch();  // Trigger the search when "Enter" is pressed
      }
    };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for services by keyword, category or county"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}  // Add this line to listen for "Enter" key press
      />
      <button className="search-button" onClick={handleSearch}>Search</button>
      <button className="clear-button" onClick={handleClearSearch}>Clear</button> {/* Add a clear button */}
    </div>
  );
}

export default SearchBar;