const router = require('express').Router();

const {
    index,
    create,
    destroy,
    update,
} = require('../../Controllers/Admin/AdminPermissionsController');

const {
    auth,
    permission
} = require('../../Middlewares');

router.get('/', [
    auth,
    (re, rs, n) => permission(re, rs, n, 'permission-list')
], index);

router.post('/', [
    auth,
    (re, rs, n) => permission(re, rs, n, 'permission-create')
], create);

router.put('/:id', [
    auth,
    (re, rs, n) => permission(re, rs, n, 'permission-update')
], update);

router.delete('/:id', [
    auth,
    (re, rs, n) => permission(re, rs, n, 'permission-delete')
], destroy);

module.exports = router;