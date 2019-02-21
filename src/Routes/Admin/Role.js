const router = require('express').Router();

const {
    index, create, update, destroy
} = require('../../Controllers/Admin/AdminRolesController');

const {
    auth,
    permission
} = require('../../Middlewares');

router.get('/', [
    auth,
    (re, rs, n) => permission(re, rs, n, 'role-list')
], index);

router.post('/', [
    auth,
    (re, rs, n) => permission(re, rs, n, 'role-create')
], create);

router.put('/:id', [
    auth,
    (re, rs, n) => permission(re, rs, n, 'role-update')
], update);

router.delete('/:id', [
    auth,
    (re, rs, n) => permission(re, rs, n, 'role-delete')
], destroy);


module.exports = router;