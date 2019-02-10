const errorMiddleware = require('./ErrorMiddleware');
const asyncMiddleware = require('./AsyncMiddleware');
const auth = require('./AuthMiddleware');
const permission = require('./PermissionsMiddleware');

module.exports = {
    errorMiddleware,asyncMiddleware,auth,permission
};