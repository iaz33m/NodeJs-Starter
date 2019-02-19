const router = require('express').Router();
const {
    me, updateRoles
} = require('../Controllers/UsersController');
const {
    auth,
    permission
} = require('../Middlewares');

router.get('/me', [
    auth,
    (re, rs, n) => permission(re, rs, n, "user-me")
], me);

router.post('/:id/roles', [
    auth,
], updateRoles);


module.exports = router;