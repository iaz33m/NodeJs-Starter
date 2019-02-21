const router = require('express').Router();
const { me } = require('../Controllers/UsersController');

const { auth } = require('../Middlewares');

router.get('/me', auth, me);


module.exports = router;