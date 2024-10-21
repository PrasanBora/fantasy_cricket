const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

// POST /teams - Create a new team
router.post('/', async (req, res) => {
  const { name, players } = req.body;
  if (players.length > 11) {
    return res.status(400).json({ message: 'A team can have at most 11 players' });
  }

  const team = new Team({ name, players });
  try {
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ message: 'Error creating team' });
  }
});

// GET /teams/:id - Retrieve a team by ID
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('players');
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving team' });
  }
});

module.exports = router;
