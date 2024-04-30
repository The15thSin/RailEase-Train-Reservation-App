const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
    // Check if authorization header exists
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    // Verify token
    jwt.verify(token, 'secret123', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
        // If token is valid, attach user information to request object
        req.user = decoded;
        next();
    });
}

module.exports =isAuthenticated;
