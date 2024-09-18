import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar'; 
import Layout from './components/Layout';
import HomePage from './pages/HomePage'; // Create this component next
// import CategoryPage from './pages/CategoryPage';
import './styles/global.scss';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/categories/:categoryId" element={<CategoryPage />} />  Category specific page */}

          {/* Add more routes here */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;