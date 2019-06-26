import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '../table-row';

const Table = (props) => {
  const { data } = props;
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

Table.defaultProps = {
  data: [],
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};
