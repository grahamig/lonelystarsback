const router = require('express').Router(); // Router is still needed
const User = require('../models/userModel'); // Example model import

// Define your routes here
router.get('/', (req, res) => {
    res.send('Hello from user routes!');
});

module.exports = router;
