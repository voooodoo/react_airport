import React from 'react';
import './header.css';

const Header = (props) => {
  const {toogleTab} = props;
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
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button
                  type="button"
                  className="btn nav-link"
                  onClick={() => toogleTab('arrivals')}
                >
                  Arrivals
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn nav-link"
                  onClick={() => toogleTab('departures')}
                >
                  Departures
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
