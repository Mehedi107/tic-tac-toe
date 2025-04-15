import { useState } from 'react';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const GameBoard = ({ selectedSquare, turns }) => {
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // const handleGameBoard = (rowIndex, colIndex) => {
  //   setGameBoard(prevGameBoard => {
  //     const updatedGameBoard = prevGameBoard.map(row => [...row]);

  //     updatedGameBoard[rowIndex][colIndex] = activePlayer;

  //     return updatedGameBoard;
  //   });

  //   selectedSquare();
  // };

  let gameBoard = initialGameBoard;

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => selectedSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
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
