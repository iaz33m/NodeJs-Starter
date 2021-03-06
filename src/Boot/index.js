require('dotenv').config();
require('./Logger');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const db = require('./DB');
const routes = require('./Routes');
const prob = require('./Prod');
const local = require('./Local');

module.exports = (app) => {
    db();
    routes(app);
    prob(app);
    local();
};