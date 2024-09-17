import React from 'react';

function CategoryList({ categories, onSelectCategory }) {
  return (
    <div className="category-list">
      <h2>Categories</h2>
      <ul>
        <li onClick={() => onSelectCategory('All')}>All</li> {/* Pass 'All' to show all services */}
        <li onClick={() => onSelectCategory('Bookmarks')}>Bookmarks</li> {/* New Bookmarks filter */}
        {categories.map((category) => (
          <li key={category.id} onClick={() => onSelectCategory(category.id)}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;