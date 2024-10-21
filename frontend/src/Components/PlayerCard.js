
import React from 'react';
import './PlayerCard.css';
function PlayerCard({ player, addPlayer ,selected,removePlayer}) {
  // avatar image 
  const avatarUrl = `/assets/avatar.png`;

  return (
    <div className="player-card">
      <img src={avatarUrl} alt={player.name} className="avatar" />
      
      <div className="player-info">
        <h3 className="player-name">{player.name}</h3>
        <p className="player-role">{player.role}</p>
        <p className="player-points">Points: {player.points}</p>
      </div>

      {!selected ? (
        <button onClick={() => addPlayer(player)} className="add-button">
          Add to Team
        </button>
      ) : (
        <button onClick={() => removePlayer(player)} className="remove-button">
          Remove
        </button>
      )}

    </div>
  );
}

export default PlayerCard;
