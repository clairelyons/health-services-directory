import React, { useState } from 'react';

function NewServiceForm({ onServiceCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [contactMethod, setContactMethod] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newService = {
      title,
      description,
      category_id: parseInt(category),
      contact_method: contactMethod,
      is_active: 1,  // Set is_active to 1 to ensure the service is created as active
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
        console.log('New service created:', data);  // Added this line to debug
        onServiceCreated(data);
        setTitle('');
        setDescription('');
        setCategory('');
        setContactMethod('');
        window.location.reload() // auto refresh
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
      <input
        type="text"
        placeholder="Category ID"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Contact Method"
        value={contactMethod}
        onChange={(e) => setContactMethod(e.target.value)}
        required
      />
      <button type="submit">Create Service</button>
    </form>
  );
}

export default NewServiceForm;