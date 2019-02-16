const router = require('express').Router();
const {
    me
} = require('../Controllers/UsersController');
const {
    auth,
    permission
} = require('../Middlewares');

router.get('/me', [
    auth,
    (req, res, next) => permission(req, res, next, "user-me")
], me);


module.exports = router;