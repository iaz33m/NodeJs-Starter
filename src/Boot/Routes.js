const express = require('express');

const {
    errorMiddleware,
    setLocal
} = require('./../Middlewares');

const {
    authRouter,
    userRouter,
    roleRouter,
    permissionRouter
} = require('./../Routes');

module.exports = (app) => {

    app.use(express.json());
    app.use(setLocal);

    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/roles', roleRouter);
    app.use('/api/v1/permissions', permissionRouter);

    app.use(errorMiddleware);
};