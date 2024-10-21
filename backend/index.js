const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Add this

require('dotenv').config({ path: './backend/.env' });

const mongoUri = process.env.MONGO_URI;
// console.log(process.env);

const app = express();

// Middleware
app.use(cors());

app.use(bodyParser.json());

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB connection failed:', err));

// Import routes
const playerRoutes = require('./routes/playerRoutes');
const teamRoutes = require('./routes/teamRoutes');

// Use routes
app.use('/players', playerRoutes);
app.use('/teams', teamRoutes);


// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
