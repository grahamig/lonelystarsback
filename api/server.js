require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Path to auth routes
const profileRoutes = require('./routes/profileRoutes'); // Path to profile routes
const auth = require('./middleware/auth'); // Middleware for protected routes

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Enable CORS for the frontend domain (Vercel)
app.use(cors({
    origin: 'https://lonelystars.vercel.app', // Frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'x-auth-token'], // Headers allowed
}));

// MongoDB Connection (Updated)
mongoose
    .connect(process.env.MONGO_URI) // No longer need the deprecated options
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes); // Auth-related routes
app.use('/api/profile', profileRoutes); // Profile-related routes

// Test Route (Unprotected)
app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from back-end mf!' });
});

// Test Route (Protected by auth middleware)
app.get('/api/test-auth', auth, (req, res) => {
    res.json({ msg: 'Token is valid!' });
});

// Export the app for Vercel serverless functions
module.exports = app;