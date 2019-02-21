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
], index);

router.post('/', [
    auth,
], create);

router.put('/:id', [
    auth,
], update);

router.delete('/:id', [
    auth,
], destroy);


module.exports = router;