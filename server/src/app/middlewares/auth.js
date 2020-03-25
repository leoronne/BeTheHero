
require('dotenv/config');

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({
            error: 'No token provided'
        })

    jwt.verify(authHeader, process.env.AUTH, (err, decoded) => {
        if (err) return res.status(401).send({
            error: 'Token invalid'
        });

        req.userId = decoded.id;
        return next();
    });
}