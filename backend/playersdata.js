const mongoose = require('mongoose');

const Player = require('./models/Player');  

require('dotenv').config();
const mongoUri = process.env.MONGO_URI;

// Connect to your MongoDB
mongoose.connect( mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.log(err));

// Sample player data
const players = [
  { name: "Virat Kohli", team: "India", role: "Batsman", points: 450 },
  { name: "MS Dhoni", team: "India", role: "Wicketkeeper", points: 400 },
  { name: "Jasprit Bumrah", team: "India", role: "Bowler", points: 380 },
  { name: "Ben Stokes", team: "England", role: "All-Rounder", points: 410 },
  { name: "Joe Root", team: "England", role: "Batsman", points: 440 },
  { name: "Jofra Archer", team: "England", role: "Bowler", points: 390 },
  { name: "David Warner", team: "Australia", role: "Batsman", points: 420 },
  { name: "Pat Cummins", team: "Australia", role: "Bowler", points: 400 },
  { name: "Steve Smith", team: "Australia", role: "Batsman", points: 460 },
  { name: "Kane Williamson", team: "New Zealand", role: "Batsman", points: 430 },
  { name: "Trent Boult", team: "New Zealand", role: "Bowler", points: 395 },
  { name: "Shakib Al Hasan", team: "Bangladesh", role: "All-Rounder", points: 420 },
  { name: "Babar Azam", team: "Pakistan", role: "Batsman", points: 450 },
  { name: "Shaheen Afridi", team: "Pakistan", role: "Bowler", points: 380 },
  { name: "Rashid Khan", team: "Afghanistan", role: "All-Rounder", points: 425 }
];

// Function to insert players into the database
const insertPlayers = async () => {
  try {
    await Player.insertMany(players);
    console.log('Players added successfully');
  } catch (error) {
    console.log('Error adding players:', error);
  } finally {
    mongoose.connection.close();
  }
};

insertPlayers();
