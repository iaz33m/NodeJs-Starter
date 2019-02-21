const authRouter = require('./Auth');
const userRouter = require('./User');
const adminUserRouter = require('./Admin/User');
const adminRoleRouter = require('./Admin/Role');
const adminPermissionRouter = require('./Admin/Permission');

module.exports = {
    authRouter,
    userRouter,
    adminUserRouter,
    adminRoleRouter,
    adminPermissionRouter
};