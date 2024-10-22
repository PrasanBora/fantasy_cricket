import axios from 'axios';

const API_URL = 'https://fantasy-cricket-ihir.onrender.com'||'http://localhost:5000';

// Fetch all players with error handling
export const fetchPlayers = async () => {
  try {
    const response = await axios.get(`${API_URL}/players`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error; // Re-throw the error for further handling if needed
  }
};

// Create a new team with error handling
export const createTeam = async (teamData) => {
  try {
    const response = await axios.post(`${API_URL}/teams`, teamData);
    return response.data;
  } catch (error) {
    console.error('Error creating team:', error);
    throw error; // Re-throw the error for further handling if needed
  }
};
