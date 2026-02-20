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
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
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

// Export for Vercel serverless functions
export default app;

// Only listen if not in Vercel environment
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}
