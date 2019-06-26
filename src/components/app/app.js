import React, { Component } from 'react';
import Header from '../header';
import Table from '../table';
import ApiService from '../../services/api/api-service';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.apiService = new ApiService();
    this.state = {
      tab: 'arrivals',
      arrival: [],
      departure: [],
    };

    this.toogleTab = (newTab) => {
      const { tab } = this.state;
      if (newTab !== tab) {
        this.setState({ tab: newTab });
      }
    };
  }

  componentDidMount() {
    const now = new Date();
    const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

    this.apiService.getData(date)
      .then((data) => {
        const { arrival, departure } = data.body;
        this.setState({ arrival, departure });
      });
  }

  render() {
    const { arrival, departure, tab } = this.state;
    let data;
    if (tab === 'arrivals') {
      data = arrival;
    } else {
      data = departure;
    }
    return (
      <>
        <Header toogleTab={this.toogleTab} />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <main>
                <h2 className="mb-2 mt-2 text-uppercase">{tab}</h2>
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
