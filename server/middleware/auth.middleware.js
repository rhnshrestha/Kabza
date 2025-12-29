const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // 1. Get token from header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract 'TOKEN' from 'Bearer TOKEN'

    if (!token) return res.status(401).json({ message: "Access Denied: No Token Provided" });

    try {
        // 2. Verify and decode
        const verified = jwt.verify(token, process.env.JWT_SECRET || "this-is-secret");
        
        // 3. Set the user info into the request
        req.user = verified; 
        next(); // Move to the createBooking controller
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = { verifyToken };