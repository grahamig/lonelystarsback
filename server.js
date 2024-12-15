require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Replace with the actual path to your auth routes
const profileRoutes = require('./routes/profileRoutes'); // Replace with the actual path to your profile routes
const auth = require('./middleware/auth');  // Import the auth middleware

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Enable CORS for the frontend domain (Vercel)
app.use(cors({
    origin: 'https://lonelystars.vercel.app',  // Allow your frontend's domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-auth-token'],
}));

// MongoDB Connection
mongoose
    .connect(
        process.env.MONGO_URI,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Test Route (without authentication) for checking the server
app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from back-end!' });
});

// Test Route for JWT (protected by auth middleware)
app.get('/api/test-auth', auth, (req, res) => {
    res.json({ msg: 'Token is valid!' });
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
