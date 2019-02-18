require('dotenv').config();
const mongooseLib = require('mongoose');
const UsersSeeder = require('./src/Seeders/UsersSeeder');

mongooseLib.Promise = global.Promise || Promise;

module.exports = {
    mongoose: mongooseLib,
    mongoURL: process.env.MONGO_URI,
    seedersList: {
        UsersSeeder
    },
};