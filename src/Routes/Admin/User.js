const router = require('express').Router();
const { updateRoles } = require('../../Controllers/Admin/AdminUsersController');

const {
    auth,
    permission
} = require('../../Middlewares');


router.post('/:id/roles', [
    auth,
    (re, rs, n) => permission(re, rs, n, 'user-role-update')
], updateRoles);


module.exports = router;