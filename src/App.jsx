import { useState } from 'react';
import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';

const deriveGameTurns = gameTurn => {
  let currentPlayer = 'X';

  if (gameTurn.length > 0 && gameTurn[0].player === 'X') {
    currentPlayer = '0';
  }

  return currentPlayer;
};

function App() {
  // Try to avoid less state and derive value from other state
  // const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveGameTurns(gameTurns);

  const handleSelectedSquare = (rowIndex, colIndex) => {
    // setActivePlayer(prevActivePlayer => (prevActivePlayer === 'X' ? '0' : 'X'));

    setGameTurns(prevTurns => {
      // let currentPlayer = 'X';

      // if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
      //   currentPlayer = '0';
      // }

      const currentPlayer = deriveGameTurns(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player name="Player 2" symbol="0" isActive={activePlayer === '0'} />
        </ol>

        <GameBoard selectedSquare={handleSelectedSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
