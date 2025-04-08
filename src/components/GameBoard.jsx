import { useState } from 'react';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const GameBoard = ({ selectedSquare, activePlayer }) => {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  const handleGameBoard = (rowIndex, colIndex) => {
    setGameBoard(prevGameBoard => {
      const updatedGameBoard = prevGameBoard.map(row => [...row]);

      updatedGameBoard[rowIndex][colIndex] = activePlayer;

      return updatedGameBoard;
    });

    selectedSquare();
  };

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleGameBoard(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
