import React from 'react';
import TableRow from '../table-row';
import {
  SORT_ORDER_TERMINAL,
  SORT_ORDER_TIME,
  SORT_ORDER_DESTINATION,
  SORT_ORDER_AIRLINE,
  SORT_ORDER_FLIGHT,
  SORT_ORDER_STATUS,
} from '../../helpers/filter-constants';

import './table.css';

const Table = ({ data, setSortField }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col" onClick={() => setSortField(SORT_ORDER_TERMINAL)}>
            Terminal
          </th>
          <th scope="col">Gate</th>
          <th scope="col" onClick={() => setSortField(SORT_ORDER_TIME)}>
            Time
          </th>
          <th scope="col" onClick={() => setSortField(SORT_ORDER_DESTINATION)}>
            Destination
          </th>
          <th scope="col" onClick={() => setSortField(SORT_ORDER_AIRLINE)}>
            Airline
          </th>
          <th scope="col" onClick={() => setSortField(SORT_ORDER_FLIGHT)}>
            Flight #
          </th>
          <th scope="col" onClick={() => setSortField(SORT_ORDER_STATUS)}>
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <TableRow row={row} key={row.ID} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
