const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Team = require('../models/team');

// POST a new team
router.post('/', auth, async (req, res) => {
    try {
        const team = new Team(req.body);
        await team.save();
        res.status(201).json(team);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET all teams
router.get('/', auth, async (req, res) => {
    try {
        const teams = await Team.find(); // Or, you might want to filter by user or other criteria
        res.json(teams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a team by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT (update) a team by ID
router.put('/:id', auth, async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.json(team);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a team by ID
router.delete('/:id', auth, async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.json({ message: 'Team deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;