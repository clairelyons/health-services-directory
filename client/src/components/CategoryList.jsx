import React from 'react';

function CategoryList() {
  const categories = ['General Health', 'Mental Health', 'Dental Care', 'Vision Care'];

  return (
    <div className="category-list">
      <h2>What topic are you interested in?</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;