// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import ServiceList from '../components/ServiceList';  // Assuming you have a ServiceList component

// function CategoryPage() {
//   const { categoryId } = useParams();  // Get categoryId from route
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     // Fetch services by category
//     fetch(`http://localhost:5002/api/services?category=${categoryId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setServices(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching services:', error);
//       });
//   }, [categoryId]);

//   return (
//     <div>
//       <h1>Services in Category {categoryId}</h1>
//       <ServiceList services={services} />  {/* Display services filtered by category */}
//     </div>
//   );
// }

// export default CategoryPage;