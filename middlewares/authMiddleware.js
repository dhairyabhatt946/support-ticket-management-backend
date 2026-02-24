const jwt = require('jsonwebtoken');

module.exports = async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(!token) {
            res.status(401).json({message: "No token provided"});
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).send('Invalid or expired token');
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(401).json({message: "Invalid token"});
    }
}