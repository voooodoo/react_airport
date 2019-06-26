import React from 'react';

import './header.css';

const Header = () => {
  return (
    <header className="header">
      <ul className="nav">
        <li className="nav-item">
          <a href="/" className="logo">Airport</a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
