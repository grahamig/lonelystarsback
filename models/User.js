// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema with additional fields
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], default: null }, // New field
    age: { type: Number, default: null }, // New field
    country: { type: String, default: null }, // New field
    bio: { type: String, default: null }, // New field
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the user model
const User = mongoose.model('User', userSchema);
module.exports = User;
