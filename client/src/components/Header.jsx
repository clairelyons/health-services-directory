import React from 'react';

const Header = () => {
  return (
    <header className="header">
        {/* Add logo, search bar, and menu items here */}
      <div className="logo">Health Services Directory</div>
      <input type="text" placeholder="Search..." className="search-bar" />
      <button className="menu-toggle">☰</button>
    </header>
  );
};

export default Header;