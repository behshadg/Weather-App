// components/Layout.js
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <h1>Weather App</h1>
      </header>
      <main className="main-content">{children}</main>
      <footer className="footer">
        <p>&copy; 2023 Weather App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
