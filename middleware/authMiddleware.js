const jwt = require('jsonwebtoken');
require('dotenv/config');
const jwtSecret = process.env.JWT_SECRET
const authenticateToken = (req, res, next) => {
    const token = req.header('Autharization');

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        //req.user = user;
        next();
    });
};

module.exports = authenticateToken;
