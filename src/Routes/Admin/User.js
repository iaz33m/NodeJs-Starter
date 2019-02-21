const router = require('express').Router();
const { updateRoles } = require('../../Controllers/Admin/AdminUsersController');

const {
    auth,
    permission
} = require('../../Middlewares');


router.post('/:id/roles', [
    auth,
], updateRoles);


module.exports = router;