require('dotenv').config();
const mongooseLib = require('mongoose');
const {
    UsersSeeder, RolesSeeder, PermissionsSeeder
} = require('./src/Seeders');

mongooseLib.Promise = global.Promise || Promise;

module.exports = {
    mongoose: mongooseLib,
    mongoURL: process.env.MONGO_URI,
    seedersList: {
        PermissionsSeeder,
        RolesSeeder,
        UsersSeeder
    },
};