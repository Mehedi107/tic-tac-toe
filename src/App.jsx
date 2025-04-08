import { useState } from 'react';
import GameBoard from './components/GameBoard';
import Player from './components/Player';

function App() {
  const [activePlayer, setActivePlayer] = useState('X');

  const handleSelectedSquare = () => {
    setActivePlayer(prevActivePlayer => (prevActivePlayer === 'X' ? '0' : 'X'));
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player ">
          <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player name="Player 2" symbol="0" isActive={activePlayer === '0'} />
        </ol>
        <GameBoard
          selectedSquare={handleSelectedSquare}
          activePlayer={activePlayer}
        />
      </div>
    </main>
  );
}

export default App;
