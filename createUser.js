const mongoose = require('mongoose');
const User = require('./models/User'); // Ensure this path matches your project structure

// Connect to MongoDB
mongoose.connect(
  'mongodb+srv://lonelystars:kdLj0RJD9i9XspDq@lonelystars.qkx9h.mongodb.net/lonelystarsdb?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

async function createUser() {
  try {
    const newUser = new User({
      username: 'Sonny',
      email: 'sonnysun@example.com',
      password: 'sun',
      gender: 'male',
      age: 22,
      country: 'Vietnam',
      bio: 'Loves rapping mf bruh',
    });

    await newUser.save(); // Save the user to MongoDB
    console.log('User created:', newUser);
    mongoose.connection.close(); // Close the connection after the operation
  } catch (err) {
    console.error('Error creating user:', err);
    mongoose.connection.close(); // Ensure connection closes even on errors
  }
}

createUser();