import { useState } from 'react';

const Player = ({ name, symbol }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  const handleEditBtn = () => setIsEditing(editing => !editing);
  const handleChangeName = e => setPlayerName(e.target.value);

  let nameLabel = <span className="player-name">{playerName}</span>;
  let btnLabel = 'Edit';

  if (isEditing) {
    nameLabel = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handleChangeName}
      />
    );
    btnLabel = 'Save';
  }

  return (
    <li>
      <span className="player">
        {nameLabel}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditBtn}>{btnLabel}</button>
    </li>
  );
};

export default Player;
