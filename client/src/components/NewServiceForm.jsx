// import React, { useState } from 'react';

// function NewServiceForm({ onServiceCreated }) {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const [contactMethod, setContactMethod] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newService = {
//       title,
//       description,
//       category_id: parseInt(category),
//       contact_method: contactMethod,
//       is_active: 1,  // Set is_active to 1 to ensure the service is created as active
//     };

//     fetch('http://localhost:5002/api/services', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newService),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Failed to create service');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log('New service created:', data);  // Added this line to debug
//         onServiceCreated(data);
//         setTitle('');
//         setDescription('');
//         setCategory('');
//         setContactMethod('');
//         window.location.reload() // auto refresh
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="new-service-form">
//     <h2>Create New Service</h2>
//       <input
//         type="text"
//         placeholder="Service Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//       />
//       <textarea
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Category ID"
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Contact Method"
//         value={contactMethod}
//         onChange={(e) => setContactMethod(e.target.value)}
//         required
//       />
//       <button type="submit">Create Service</button>
//     </form>
//   );
// }

// export default NewServiceForm;

import React, { useState, useEffect } from 'react';
import './newserviceform.scss'; // Import the new styles

function NewServiceForm({ onServiceCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(''); // Keep track of category_id
  const [contactMethod, setContactMethod] = useState('');
  const [county, setCounty] = useState(''); // New field for county
  const [categories, setCategories] = useState([]); // List of categories to populate the dropdown

  // Fetch categories on component mount
  useEffect(() => {
    fetch('http://localhost:5002/api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Failed to fetch categories:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newService = {
      title,
      description,
      category_id: parseInt(category),
      contact_method: contactMethod,
      county,  // Include county in the new service
      is_active: 1,  // Default to active status
    };

    fetch('http://localhost:5002/api/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newService),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create service');
        }
        return response.json();
      })
      .then((data) => {
        console.log('New service created:', data);
        onServiceCreated(data);
        setTitle('');
        setDescription('');
        setCategory('');
        setContactMethod('');
        setCounty('');
        window.location.reload(); // auto-refresh
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="new-service-form">
      <h2>Create New Service</h2>
      <input
        type="text"
        placeholder="Service Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      
      {/* Category dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Contact Method"
        value={contactMethod}
        onChange={(e) => setContactMethod(e.target.value)}
        required
      />
      
      <input
        type="text"
        placeholder="County"
        value={county}
        onChange={(e) => setCounty(e.target.value)}
        required
      />

      <button type="submit">Create Service</button>
    </form>
  );
}

export default NewServiceForm;