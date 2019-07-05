import React, { Component } from 'react';
import Header from '../header';
import Table from '../table';
import ApiService from '../../services/api/api-service';
import { ARRIVALS, DEPARTURES, DAY_YESTERDAY, DAY_TODAY, DAY_TOMORROV } from '../../helpers/constants';

import './app.css';

class App extends Component {
  state = {
    tab: ARRIVALS,
    arrival: [],
    departure: [],
    date: this.getDate(),
    day: DAY_TODAY,
  };

  toogleTab = newTab => {
    if (newTab !== this.state.tab) {
      this.setState({ tab: newTab });
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

      this.setState({ date: this.getDate(date), day: newDay }, () => this.fetch());
    }
  };

  setData(arrival, departure, tab) {
    switch (tab) {
      case ARRIVALS:
        return arrival;
      case DEPARTURES:
        return departure;

      default:
        return arrival;
    }
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
    const { arrival, departure, tab, date, day } = this.state;
    const data = this.setData(arrival, departure, tab);

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
                <Table data={data} />
              </main>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
