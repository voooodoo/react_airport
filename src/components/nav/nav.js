import React from 'react';
import NavItem from '../nav-item';
import { ARRIVALS, DEPARTURES, DAY_YESTERDAY, DAY_TODAY, DAY_TOMORROV } from '../../helpers/constants';

const Nav = ({ toogleTab, toogleDay }) => {
  return (
    <>
      <ul className="nav nav-tabs">
        <NavItem clickItem={() => toogleTab(ARRIVALS)}>Arrivals</NavItem>
        <NavItem clickItem={() => toogleTab(DEPARTURES)}>Departures</NavItem>
      </ul>
      <ul className="nav nav-tabs ml-auto">
        <NavItem clickItem={() => toogleDay(DAY_YESTERDAY)}>Yesterday</NavItem>
        <NavItem clickItem={() => toogleDay(DAY_TODAY)}>Today</NavItem>
        <NavItem clickItem={() => toogleDay(DAY_TOMORROV)}>Tomorrow</NavItem>
      </ul>
    </>
  );
};

export default Nav;
