import express from 'express';
import Society from '../models/Society.js'; // Ensure this file uses `export default`
import jswt from 'jsonwebtoken';
const router = express.Router();

// Create a Society
router.post('/', async (req, res) => {
  try {
    const society = new Society(req.body);
    await society.save();
    res.status(201).json(society);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const society = await Society.findOne({ username });
    if (!society || society.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jswt.sign(
      { id: society._id, role: 'society' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({
      token,
      society: {
        _id: society._id,
        username: society.username,
        name: society.name,
        email: society.email,
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout (stateless)
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});


// Get All Societies
router.get('/', async (req, res) => {
  try {
    const societies = await Society.find();
    res.json(societies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Single Society
router.get('/:id', async (req, res) => {
  try {
    const society = await Society.findById(req.params.id);
    if (!society) return res.status(404).json({ error: 'Society not found' });
    res.json(society);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a Society
router.put('/:id', async (req, res) => {
  try {
    const updated = await Society.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a Society
router.delete('/:id', async (req, res) => {
  try {
    await Society.findByIdAndDelete(req.params.id);
    res.json({ message: 'Society deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
