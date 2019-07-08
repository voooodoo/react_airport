import React, { Component } from 'react';
import Header from '../header';
import Table from '../table';
import ApiService from '../../services/api/api-service';
import { ARRIVALS, DAY_YESTERDAY, DAY_TODAY, DAY_TOMORROV } from '../../helpers/constants';
import {
  SORT_ORDER_TERMINAL,
  SORT_ORDER_TIME,
  SORT_ORDER_DESTINATION,
  SORT_ORDER_AIRLINE,
  SORT_ORDER_FLIGHT,
  SORT_ORDER_STATUS,
  SORT_ORDER_ASCENDING,
  SORT_ORDER_DESCENDING,
} from '../../helpers/filter-constants';

import './app.css';

class App extends Component {
  state = {
    tab: ARRIVALS,
    arrival: [],
    departure: [],
    date: this.getDate(),
    day: DAY_TODAY,
    sortField: null,
    sortOrder: SORT_ORDER_ASCENDING,
    isLoading: false,
  };

  toogleTab = newTab => {
    if (newTab !== this.state.tab) {
      this.setState({ tab: newTab, sortField: null });
    }
  };

  toogleDay = newDay => {
    if (newDay !== this.state.day) {
      const date = new Date();
      // eslint-disable-next-line default-case
      switch (newDay) {
        case DAY_YESTERDAY:
          date.setDate(new Date().getDate() - 1);
          break;
        case DAY_TOMORROV:
          date.setDate(new Date().getDate() + 1);
          break;
      }

      this.setState({ date: this.getDate(date), day: newDay, sortField: null }, this.fetch);
    }
  };

  setrSortField = sortField => {
    if (this.state.sortField !== sortField) {
      this.setState({ sortField, sortOrder: SORT_ORDER_ASCENDING });
    } else {
      this.setState(prevState => ({
        sortOrder: prevState.sortOrder === SORT_ORDER_ASCENDING ? SORT_ORDER_DESCENDING : SORT_ORDER_ASCENDING,
      }));
    }
  };

  sortData(data, sortField, sortOrder) {
    const orderDestAscending = (a, b) => {
      const destA = a['airportFromID.city_en'] || a['airportToID.city_en'];
      const destB = b['airportFromID.city_en'] || b['airportToID.city_en'];
      return destA.localeCompare(destB);
    };

    const orderDestDescending = (a, b) => {
      const destA = a['airportFromID.city_en'] || a['airportToID.city_en'];
      const destB = b['airportFromID.city_en'] || b['airportToID.city_en'];
      return destB.localeCompare(destA);
    };

    const orderAirlineAscending = (a, b) => {
      const airlineA = a.airline.en.name;
      const airlineB = b.airline.en.name;
      return airlineA.localeCompare(airlineB);
    };

    const orderAirlineDescending = (a, b) => {
      const airlineA = a.airline.en.name;
      const airlineB = b.airline.en.name;
      return airlineB.localeCompare(airlineA);
    };

    const callbackMap = {
      [SORT_ORDER_TERMINAL]:
        sortOrder === SORT_ORDER_ASCENDING
          ? (a, b) => a.term.localeCompare(b.term)
          : (a, b) => b.term.localeCompare(a.term),
      [SORT_ORDER_TIME]:
        sortOrder === SORT_ORDER_ASCENDING
          ? (a, b) => new Date(a.actual) - new Date(b.actual)
          : (a, b) => new Date(b.actual) - new Date(a.actual),
      [SORT_ORDER_DESTINATION]: sortOrder === SORT_ORDER_ASCENDING ? orderDestAscending : orderDestDescending,
      [SORT_ORDER_AIRLINE]: sortOrder === SORT_ORDER_ASCENDING ? orderAirlineAscending : orderAirlineDescending,
      [SORT_ORDER_FLIGHT]:
        sortOrder === SORT_ORDER_ASCENDING ? (a, b) => a.fltNo - b.fltNo : (a, b) => b.fltNo - a.fltNo,
      [SORT_ORDER_STATUS]:
        sortOrder === SORT_ORDER_ASCENDING
          ? (a, b) => a.status.localeCompare(b.status)
          : (a, b) => b.status.localeCompare(a.status),
    };

    const callback = callbackMap[sortField];

    return data.sort(callback);
  }

  getDate(date = new Date()) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  fetch() {
    this.setState({ isLoading: true });
    ApiService.getData(this.state.date).then(({ arrival, departure }) => {
      this.setState({ arrival, departure, isLoading: false });
    });
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    const { arrival, departure, tab, date, day, sortField, isLoading, sortOrder } = this.state;
    let data = tab === ARRIVALS ? arrival : departure;

    if (sortField) {
      data = this.sortData(data, sortField, sortOrder);
    }

    const content = isLoading ? (
      <div className="spinner spinner-border text-primary"></div>
    ) : (
      <Table data={data} setrSortField={this.setrSortField} />
    );

    return (
      <>
        <Header toogleTab={this.toogleTab} toogleDay={this.toogleDay} />

        <div className="container">
          <div className="row">
            <div className="col-12">
              <main>
                <h2 className="mb-2 mt-2 text-uppercase">
                  {tab} &nbsp;
                  <small>{day}: &nbsp;</small>
                  <small>{date}</small>
                </h2>
                {content}
              </main>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
