const errorMiddleware = require('./ErrorMiddleware');
const asyncMiddleware = require('./AsyncMiddleware');
const setLocal = require('./SetLocalMiddleware');
const auth = require('./AuthMiddleware');
const permission = require('./PermissionsMiddleware');

module.exports = {
    errorMiddleware, asyncMiddleware, auth, permission,
    setLocal
};