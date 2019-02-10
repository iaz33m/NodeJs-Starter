const express = require('express');

const { errorMiddleware } = require('./../Middlewares');
const { authRouter, userRouter } = require('./../Routes/User');

module.exports = (app) => {
    
    app.use(express.json());

    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/users', userRouter);

    app.use(errorMiddleware);
};