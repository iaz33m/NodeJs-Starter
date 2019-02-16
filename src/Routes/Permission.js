const router = require('express').Router();

const {
    index,
    create,
    destroy,
    update,
} = require('../Controllers/PermissionsController');

const {
    auth,
    permission
} = require('../Middlewares');

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