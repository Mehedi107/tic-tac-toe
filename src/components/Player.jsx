import { useState } from 'react';

const Player = ({ name, symbol, isActive, onChangeName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  function handleEditBtn() {
    setIsEditing(editing => !editing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }
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
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {nameLabel}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditBtn}>{btnLabel}</button>
    </li>
  );
};

export default Player;
