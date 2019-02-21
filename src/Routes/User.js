const router = require('express').Router();
const { me } = require('../Controllers/UsersController');

const {
    auth,
    permission
} = require('../Middlewares');

router.get('/me', [
    auth,
    (re, rs, n) => permission(re, rs, n, "user-me")
], me);


module.exports = router;