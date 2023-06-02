import React from 'react';

function ResultScreen({ visitedCells }) {
  return (
    <div>
      <h2>Result</h2>
      <div>Initial and Subsequent Steps: {visitedCells?.map(([row, col]) => `${row}-${col}`).join(', ')}</div>
    </div>
  );
}

export default ResultScreen;