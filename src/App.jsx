import { useState } from 'react';
import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveGameTurns = gameTurn => {
  let currentPlayer = 'X';

  if (gameTurn.length > 0 && gameTurn[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
};

function App() {
  const [players, setPlayers] = useState({ X: 'Player 1', O: 'Player 2' });
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveGameTurns(gameTurns);
  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  const hasWinner = gameTurns.length === 9 && !winner;

  function handleSelectedSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveGameTurns(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function resetGame() {
    setGameTurns([]);
  }

  function handleChangePlayerName(symbol, newPlayerName) {
    setPlayers(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol]: newPlayerName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handleChangePlayerName}
          />
          <Player
            name="Player 2"
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handleChangePlayerName}
          />
        </ol>
        {(winner || hasWinner) && (
          <GameOver winner={winner} reset={resetGame} />
        )}
        <GameBoard selectedSquare={handleSelectedSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
