import React from 'react';
import TableRow from '../table-row';

const Table = ({ data }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Terminal</th>
          <th scope="col">Gate</th>
          <th scope="col">Time</th>
          <th scope="col">Destination</th>
          <th scope="col">Airline</th>
          <th scope="col">Flight #</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map(
            row => (<TableRow row={row} key={row.ID} />)
          )
        }
      </tbody>
    </table>
  );
};

export default Table;
