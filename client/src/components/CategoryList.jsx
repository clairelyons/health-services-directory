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

// import React from 'react';
// import { Link } from 'react-router-dom';

// function CategoryList({ categories }) {
//   return (
//     <div className="category-list">
//       <h2>Categories</h2>
//       <ul>
//         <li>
//           <Link to="/">All</Link>  {/* Link to homepage */}
//         </li>
//         {categories.map((category) => (
//           <li key={category.id}>
//             <Link to={`/categories/${category.id}`}>{category.name}</Link>  {/* Link to category route */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default CategoryList;