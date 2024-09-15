import React from 'react';
import Footer from './Footer';
import NavBar from './NavBar';

function Layout({ children }) {
  return (
    <div className="layout">
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;