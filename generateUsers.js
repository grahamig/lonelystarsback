const mongoose = require('mongoose');

// Connection URI
const uri = "mongodb+srv://lonelystars:kdLj0RJD9i9XspDq@lonelystars.qkx9h.mongodb.net/lonelystarsdb?retryWrites=true&w=majority";

// Connecting to MongoDB Atlas
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

// Define User schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

// Define the model based on the schema
const User = mongoose.model('User', userSchema, 'users');  // 'users' is the target collection

// Sample data to insert
const users = [
    { username: 'StarGazer', email: 'stargazer@example.com', password: 'password123' },
    { username: 'MoonWalker', email: 'moonwalker@example.com', password: 'securepass' },
    { username: 'MrDean', email: 'mrdean@mrd.com', password: 'deanwitdabigween' }, 
    { username: 'MrJulius', email: 'mrjulius@mrj.com', password: 'juliusnofoolius' },
];

// Insert sample users into the users collection
User.insertMany(users)
    .then((docs) => {
        console.log('Users inserted:', docs);
    })
    .catch((error) => {
        console.error('Error inserting users:', error);
    });
