import React from 'react';
import PropTypes from 'prop-types';

const TableRow = (props) => {
  const {
    row: {
      term,
      gateNo,
      ['airportFromID.city_en'] : from,
      ['airportToID.city_en']: to,
      airline: { en: { name: airline } },
      fltNo,
      status,
      actual,
    },
  } = props;

  const date = new Date(actual);
  const time = `${date.getHours()}:${ date.getMinutes()}`;

  return (
    <tr>
      <td>{ term }</td>
      <td>{ gateNo }</td>
      <td>{ time }</td>
      <td>{ from || to }</td>
      <td>{ airline }</td>
      <td>{ fltNo }</td>
      <td>{ status }</td>
    </tr>
  );
};

export default TableRow;

TableRow.defaultProps = {
  row: {
    term: null,
    gateNo: null,
    destination: null,
    airline: null,
    fltNo: null,
    status: null,
  },
};

TableRow.propTypes = {
  row: PropTypes.shape({
    term: PropTypes.string,
    gateNo: PropTypes.string,
    destination: PropTypes.string,
    airline: PropTypes.object,
    fltNo: PropTypes.string,
    status: PropTypes.string,
  }),
};
