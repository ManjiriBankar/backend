// project-management-backend/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Authorization denied, token missing' });
    }

    try {
        const tokenString = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(400).json({ message: 'Invalid token' });
        } else if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token expired' });
        } else {
            console.error("JWT verification error:", error);
            return res.status(500).json({ message: 'Server error during token verification' });
        }
    }
};