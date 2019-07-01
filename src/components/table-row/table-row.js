import React from 'react';

const TableRow = (props) => {
  const {
    row: {
      term,
      gateNo,
      'airportFromID.city_en' : from,
      'airportToID.city_en': to,
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
