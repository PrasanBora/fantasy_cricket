const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// GET /players - Retrieve all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving players' });
  }
});

module.exports = router;
