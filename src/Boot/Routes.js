const express = require('express');

const {
    errorMiddleware,
    setLocal
} = require('./../Middlewares');

const {
    authRouter,
    userRouter,
    adminUserRouter,
    adminRoleRouter,
    adminPermissionRouter
} = require('./../Routes');

module.exports = (app) => {

    app.use(express.json());
    app.use(setLocal);

    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/admin/users', adminUserRouter);
    app.use('/api/v1/admin/roles', adminRoleRouter);
    app.use('/api/v1/admin/permissions', adminPermissionRouter);

    app.use(errorMiddleware);
};