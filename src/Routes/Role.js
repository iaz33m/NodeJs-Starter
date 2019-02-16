const router = require('express').Router();

const {
    index
} = require('../Controllers/RolesController');

const {
    auth,
    permission
} = require('../Middlewares');

router.get('/', [
    auth,
], index);


module.exports = router;