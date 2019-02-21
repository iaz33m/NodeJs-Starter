const Joi = require('joi');
const mongoose = require('mongoose');

const { Role } = require('./Role');

const jwt = require('jsonwebtoken');
const _ = require('lodash');


const UserRules = {

    firstName: {
        type: String,
        minlength: 2,
        maxlength: 255,
        trim: true,
        required: true,
    },

    lastName: {
        type: String,
        minlength: 2,
        maxlength: 255,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        minlength: 2,
        maxlength: 255,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 2,
        maxlength: 255,
        trim: true,
        required: true,
        maxlength: 1024,
    },
    number: {
        type: String,
        minlength: 2,
        maxlength: 255,
        trim: true,
        unique: true,
    },
    roles: [String]
};

const userSchema = new mongoose.Schema(UserRules);

userSchema.methods.getPermissions = async function () {

    let prs = [];
    const roles = await Role.where('name').in(this.roles).exec();

    roles.forEach(r => {
        prs = _.merge(prs, r.permissions);
    });

    return prs;
}
userSchema.methods.getJWT = async function () {

    const permissions = await this.getPermissions();

    let user = _.pick(this, [
        '_id', 'firstName', 'lastName', 'email', 'number'
    ]);

    const { JWT_SECRET } = process.env;

    return jwt.sign({
        ...user,
        permissions
    }, JWT_SECRET || 'NO8IEpxaEA83Q7AO6L5vEQHwmoNJFwXP');
}

const User = mongoose.model('User', userSchema);

function validate(user) {
    const {
        firstName,
        lastName,
        email,
        number
    } = UserRules;
    const schema = {
        firstName: Joi.string().min(firstName.minlength).max(firstName.maxlength).required(),
        lastName: Joi.string().min(lastName.minlength).max(lastName.maxlength).required(),
        email: Joi.string().min(email.minlength).max(email.maxlength).required().email(),
        password: Joi.string().min(6).required(),
        number: Joi.string().min(number.minlength).max(number.maxlength),
    };

    return Joi.validate(user, schema);
}

module.exports = {
    User,
    validate
}