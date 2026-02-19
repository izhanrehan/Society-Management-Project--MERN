import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';

//import authRoutes from './src/routes/old_auth.routes.js'; 
import societyRoutes from './src/routes/society.routes.js'; 
import eventRoutes from './src/routes/event.routes.js'; 
import registrationRoutes from './src/routes/registration.routes.js'; 

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ Use routes
// app.use('/api/auth', authRoutes);
app.use('/api/societies', societyRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes); 

// Port
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
