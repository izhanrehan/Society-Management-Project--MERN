// server/src/routes/registration.routes.js (Backend file)
import express from 'express';
import Registration from '../models/Registration.js'; // Ensure the model is exported using ESM

const router = express.Router();

// Register for Event
router.post('/', async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    res.status(201).json(registration);
  } catch (err) {
    // You might want more specific error messages here, e.g., for validation errors
    res.status(400).json({ error: err.message });
  }
});

// Get all registrations for a specific event
router.get('/event/:eventId', async (req, res) => {
  try {
    // Corrected to use 'event_id' if that's what your model schema uses
    const registrations = await Registration.find({ event_id: req.params.eventId });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Registrations
router.get('/', async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to mark attendance
router.patch('/mark-attendance/:id', async (req, res) => {
  const { id } = req.params;
  const { attended } = req.body;

  try {
    const registration = await Registration.findByIdAndUpdate(
      id,
      { attended },
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.status(200).json({ message: 'Attendance updated', registration });
  } catch (error) {
    res.status(500).json({ message: 'Error updating attendance', error });
  }
});

export default router;