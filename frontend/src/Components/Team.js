import React, { useState, useEffect } from 'react';
import { createTeam, fetchPlayers } from '../services/api';
import PlayerList from './PlayerList';
import './TeamManager.css';
import PlayerCard from './PlayerCard';


function TeamManager() {
  const [teamName, setTeamName] = useState('');
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [availablePlayers, setAvailablePlayers] = useState([]); 
  const [totalPoints, setTotalPoints] = useState(0);

  // Fetch the players when the component mounts
  useEffect(() => {
    const loadPlayers = async () => {
      const playerData = await fetchPlayers();
      // console.log('playerData:', playerData);
      setAvailablePlayers(playerData); // Assuming playerData has the structure { data: [...] }
    };
    loadPlayers();
  }, []);

  useEffect(() => {
    if (Object.keys(availablePlayers).length > 0) {
      // Re-render the PlayerList component with the new data
      <PlayerList players={availablePlayers} addPlayer={addPlayer} />;
    }
  }, [availablePlayers]);


  const addPlayer = (player) => {
    const playerExists = teamPlayers.some((teamPlayer) => teamPlayer.name === player.name);
    if (!playerExists && teamPlayers.length < 11) {
      setTeamPlayers([...teamPlayers, player]);
      setTotalPoints((prevPoints) => prevPoints + player.points);
    } else if (playerExists) {
      alert(`${player.name} is already in your team!`);
    } else {
      alert('You can only add a maximum of 11 players to your team!');
    }
  };

  const handleSubmit = () => {
    
    if (teamName.trim() === '') {
      alert('Team name cannot be empty!');
      return;
    }

    if (teamPlayers.length < 11) {
      alert('You must select at least 11 players to create a team!');
      return;
    }

    const teamData = { name: teamName, players: teamPlayers.map(p => p._id) };
    createTeam(teamData).then(() => alert('Team created successfully!'));
  };

  const removePlayer = (player) => {
    setTeamPlayers(teamPlayers.filter((teamPlayer) => teamPlayer._id !== player._id));
    setTotalPoints((prevPoints) => prevPoints - player.points);
  };
  

  return (
    <div>
      <h1 className="title"> Fantasy Team</h1>
      
  <div className="header-container">

   <div>
      <input
        type="text"
        placeholder="Team Name"
        value={teamName}
        onChange={e => setTeamName(e.target.value)}
      />
      <button onClick={handleSubmit}>Create Team</button>
    </div>

    <h3 className='total-points'>Total Team Points: {totalPoints}</h3>
  </div>

      
      <div className="container">
        <PlayerList players={availablePlayers} addPlayer={addPlayer} />

        <div className="team-container"> 
            {teamPlayers.map(player => (
            <PlayerCard 
            key={player._id} 
            player={player} 
            selected={true} 
            removePlayer={removePlayer}
            /> // Render PlayerCard for each player
          ))}
        </div>
         
      </div>
      
    </div>
  );
}

export default TeamManager;
