import React, { useState } from 'react';
import ChessBoard from './ChessBoard';
import ResultScreen from './ResultScreen';
import './App.css'

function App() {
  const [boardSize, setBoardSize] = useState('');
  const [numSteps, setNumSteps] = useState('');
  const [activeCell, setActiveCell] = useState(null);
  const [visitedCells, setVisitedCells] = useState([]);

  const handleStartGame = () => {
    if (boardSize && numSteps) {
      const randomRow = Math.floor(Math.random() * boardSize);
      const randomCol = Math.floor(Math.random() * boardSize);
      setActiveCell([randomRow, randomCol]);
      setVisitedCells([[randomRow, randomCol]]);
    }
  };

  return (
    <div className="App">
      <h2>ChessBoard Game</h2>

      {!activeCell ? (
        // Initial Page with Form
        <div className="board-container">
          <div>
            <label htmlFor="boardSize">Board Size:</label>
            <input
              type="number"
              id="boardSize"
              value={boardSize}
              onChange={(e) => setBoardSize(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="numSteps">Number of Steps:</label>
            <input
              type="number"
              id="numSteps"
              value={numSteps}
              onChange={(e) => setNumSteps(Number(e.target.value))}
            />
          </div>
          <div>
            <button onClick={handleStartGame}>OK</button>
          </div>
        </div>)
        : null}

      {activeCell && (numSteps + 1) > visitedCells.length ? (
        // ChessBoard
        <div className="board-container">
          <ChessBoard
            boardSize={boardSize}
            numSteps={numSteps}
            activeCell={activeCell}
            setActiveCell={setActiveCell}
            visitedCells={visitedCells}
            setVisitedCells={setVisitedCells}
          />
        </div>
      ) : null}

      {(numSteps + 1) == visitedCells.length && activeCell ? (
        // Result Screen
        <div className="result-container">
          <ResultScreen visitedCells={visitedCells} />
        </div>
      ) : null}
    </div>
  );
}

export default App;
