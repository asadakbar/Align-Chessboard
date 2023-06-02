import React, { useEffect } from 'react';

function ChessBoard({ boardSize, numSteps, activeCell, setActiveCell, setVisitedCells, visitedCells }) {

  useEffect(() => {
    const handleKeyDown = (e) => {
      const { keyCode } = e;
      const [row, col] = activeCell;
      const leftArrow = keyCode === 37;
      const upArrow = keyCode === 38;
      const rightArrow = keyCode === 39;
      const downArrow = keyCode === 40;

      let nextActiveCell;

      if (leftArrow && col > 0) {
        nextActiveCell = [row, col - 1];
      } else if (upArrow && row > 0) {
        nextActiveCell = [row - 1, col];
      } else if (rightArrow && col < boardSize - 1) {
        nextActiveCell = [row, col + 1];
      } else if (downArrow && row < boardSize - 1) {
        nextActiveCell = [row + 1, col];
      }

      setActiveCell(nextActiveCell);

      setVisitedCells((visitedCells) => {
        return [...visitedCells, nextActiveCell];
      });
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCell, setActiveCell, boardSize]);

  const renderBoard = () => {
    const cells = [];

    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        cells.push(
          <div
            key={`${row}-${col}`}
            className={`cell ${activeCell[0] === row && activeCell[1] === col ? 'active' : ''}`}
          >
            {`${row}-${col}`}
          </div>
        );
      }
    }

    return cells;
  };

  return (
    <div>
      <h2>ChessBoard</h2>
      <div className="board" style={{
        gridTemplateColumns: `repeat(${boardSize}, 1fr)`
      }}>
        {renderBoard()}
      </div>
      <div>Remaining Steps: {(numSteps + 1) - visitedCells.length}</div>
    </div>
  );
}

export default ChessBoard;