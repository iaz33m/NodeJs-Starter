const expressJwt = require('express-jwt');

module.exports = expressJwt({
    secret:process.env.JWT_SECRET
});