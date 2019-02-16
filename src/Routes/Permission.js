const router = require('express').Router();

const {
    index,
    create
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


module.exports = router;