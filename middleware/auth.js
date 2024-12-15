const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    // If no token is found, deny access
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Log the JWT secret to verify it is being loaded correctly
        console.log('JWT_SECRET from .env:', process.env.JWT_SECRET);  // Add this line

        // Verify token and decode user ID from it
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET should be in your environment variables
        req.user = decoded.userId; // Attach userId to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error('Error verifying token:', err.message);  // Add this line for better error debugging
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = auth;
