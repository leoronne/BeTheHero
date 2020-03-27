
require('dotenv/config');

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({
            message: 'No token provided'
        })

    jwt.verify(authHeader, process.env.AUTH, (err, decoded) => {
        if (err) return res.status(401).send({
            message: 'Token invalid'
        });

        req.userId = decoded.id;
        return next();
    });
}