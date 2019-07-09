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
} from '../../helpers/filter-constants';

import './app.css';

class App extends Component {
  state = {
    arrival: [],
    departure: [],
    visibleData: [],
    isLoading: false,
    tab: ARRIVALS,
    date: this.getDate(),
    day: DAY_TODAY,
    isSortedAsc: true,
    sortField: null,
  };

  toogleTab = newTab => {
    if (newTab !== this.state.tab) {
      const { arrival, departure } = this.state;
      this.setState({
        tab: newTab,
        visibleData: newTab === ARRIVALS ? [...arrival] : [...departure],
      });
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

  setSortField = newSortField => {
    this.setState(prevState => {
      const { sortField, tab, arrival, departure, isSortedAsc } = prevState;
      const isSortedFieldChanged = sortField !== newSortField ? true : false;
      const newIsSortedAsc = isSortedFieldChanged ? true : !isSortedAsc;
      const preaperedData = tab === ARRIVALS ? [...arrival] : [...departure];
      return {
        isSortedAsc: newIsSortedAsc,
        sortField: newSortField,
        visibleData: this.sortData(preaperedData, newSortField, newIsSortedAsc),
      };
    });
  };

  sortData(data, sortField, isSortedAsc) {
    const sign = isSortedAsc ? 1 : -1;
    const callbackMap = {
      [SORT_ORDER_TERMINAL]: (a, b) => a.term.localeCompare(b.term) * sign,
      [SORT_ORDER_TIME]: (a, b) => new Date(a.actual) - new Date(b.actual) * sign,
      [SORT_ORDER_DESTINATION]: (a, b) => {
        const destA = a['airportFromID.city_en'] || a['airportToID.city_en'];
        const destB = b['airportFromID.city_en'] || b['airportToID.city_en'];
        return destA.localeCompare(destB) * sign;
      },
      [SORT_ORDER_AIRLINE]: (a, b) => {
        const airlineA = a.airline.en.name;
        const airlineB = b.airline.en.name;
        return airlineA.localeCompare(airlineB) * sign;
      },
      [SORT_ORDER_FLIGHT]: (a, b) => a.fltNo - b.fltNo * sign,
      [SORT_ORDER_STATUS]: (a, b) => a.status.localeCompare(b.status) * sign,
    };

    const callback = callbackMap[sortField];

    return [...data].sort(callback);
  }

  getDate(date = new Date()) {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }

  fetch() {
    this.setState({ isLoading: true });
    ApiService.getData(this.state.date).then(({ arrival, departure }) => {
      this.setState({ arrival, departure, isLoading: false, visibleData: arrival });
    });
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    const { tab, date, day, isLoading, visibleData } = this.state;

    const content = isLoading ? (
      <div className="spinner spinner-border text-primary"></div>
    ) : (
      <Table data={visibleData} setSortField={this.setSortField} />
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
