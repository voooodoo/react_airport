import React from 'react';
import Nav from '../nav';
import './header.css';

const Header = ({ toogleTab, toogleDay }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex align-items-center">
            <ul className="nav">
              <li className="nav-item">
                <span className="logo">Airport</span>
              </li>
            </ul>
            <Nav toogleTab={toogleTab} toogleDay={toogleDay} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
