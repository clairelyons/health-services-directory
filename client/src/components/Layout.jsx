import React from 'react';
import Header from './Header';
import Footer from './Footer';
import NavBar from './NavBar';

function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <NavBar /> {/* Added NavBar here */}
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;