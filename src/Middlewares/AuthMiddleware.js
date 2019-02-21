const expressJwt = require('express-jwt');

const { JWT_SECRET } = process.env;

module.exports = expressJwt({
    secret: JWT_SECRET || 'NO8IEpxaEA83Q7AO6L5vEQHwmoNJFwXP'
});