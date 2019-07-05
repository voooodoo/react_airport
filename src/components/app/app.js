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
    tab: ARRIVALS,
    arrival: [],
    departure: [],
    date: this.getDate(),
    day: DAY_TODAY,
    sortField: null,
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

      this.setState({ date: this.getDate(date), day: newDay, sortField: null }, () => this.fetch());
    }
  };

  setrSortField = sortField => {
    if (this.state.sortField !== sortField) {
      this.setState({ sortField });
    }
  };

  sortData(data, sortField) {
    const callbackMap = {
      [SORT_ORDER_TERMINAL]: (a, b) => a.term.localeCompare(b.term),
      [SORT_ORDER_TIME]: (a, b) => new Date(a.actual) - new Date(b.actual),
      [SORT_ORDER_DESTINATION]: (a, b) => {
        let destA = a['airportFromID.city_en'] || a['airportToID.city_en'];
        let destB = b['airportFromID.city_en'] || b['airportToID.city_en'];
        return destA.localeCompare(destB);
      },
      [SORT_ORDER_AIRLINE]: (a, b) => {
        let airlineA = a.airline.en.name;
        let airlineB = b.airline.en.name;
        return airlineA.localeCompare(airlineB);
      },
      [SORT_ORDER_FLIGHT]: (a, b) => a.fltNo - b.fltNo,
      [SORT_ORDER_STATUS]: (a, b) => a.status.localeCompare(b.status),
    };

    const callback = callbackMap[sortField];

    return data.sort(callback);
  }

  getDate(date = new Date()) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  fetch() {
    ApiService.getData(this.state.date).then(data => {
      const { arrival, departure } = data;
      this.setState({ arrival, departure });
    });
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    const { arrival, departure, tab, date, day, sortField } = this.state;
    let data = tab === ARRIVALS ? arrival : departure;

    if (sortField) {
      data = this.sortData(data, sortField);
    }

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
                <Table data={data} setrSortField={this.setrSortField} />
              </main>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
