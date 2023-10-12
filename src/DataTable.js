import "./css/Table.css";
import React from 'react';

function TableComponent({ emotions }) {
    let currentIndex = 1; // Initialize index to 1


  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Angry</th>
          <th>Disgust</th>
          <th>Fear</th>
          <th>Happy</th>
          <th>Neutral</th>
          <th>Sad</th>
          <th>Surprise</th>

        </tr>
      </thead>
      <tbody>
        {emotions.map((item, index) => (
          <tr key={index}>
            <td>{currentIndex++}</td> {/* Increment the index for each row */}
            <td>{item.angry}</td>
            <td>{item.disgust}</td>
            <td>{item.fear}</td>
            <td>{item.happy}</td>
            <td>{item.neutral}</td>
            <td>{item.sad}</td>
            <td>{item.surprise}</td>
          </tr>
          ))}
      </tbody>
    </table>
  );
}

export default TableComponent;
