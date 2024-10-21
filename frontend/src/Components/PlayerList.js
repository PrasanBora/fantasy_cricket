import React from 'react';
import PlayerCard from './PlayerCard';


function PlayerList({ players, addPlayer }) {

  if (!players ) {
    return <div>Loading players...</div>; 
  }

  return (
    <div className="player-list">
      {   Object.entries(players).map(([key, player]) => (
           <PlayerCard key={key} player={player} addPlayer={addPlayer} selected={false} />
      ))}
    </div>
  );
}

export default PlayerList;
