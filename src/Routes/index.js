const authRouter = require('./Auth');
const userRouter = require('./User');
const roleRouter = require('./Role');
const permissionRouter = require('./Permission');

module.exports = {
    authRouter,
    userRouter,
    roleRouter,
    permissionRouter
};