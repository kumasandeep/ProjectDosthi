const jwt = require('jsonwebtoken');
exports.validateToken = (payload, expried) => {
    return jwt.sign(payload, process.env.TOKEN_SCRECT, {
        expiresIn: expried,
    });
}