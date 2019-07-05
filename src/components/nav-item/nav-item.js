import React from 'react';

const NavItem = ({ clickItem, children }) => {
  return (
    <li className="nav-item">
      <button type="button" className="btn nav-link" onClick={clickItem}>
        {children}
      </button>
    </li>
  );
};

export default NavItem;
